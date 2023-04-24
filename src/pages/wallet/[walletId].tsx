import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@/hooks';
import { ethers } from 'ethers';
import { goerli } from '@/models/Chain';
import { toFixedIfNecessary } from '@/utils/account';
import { generateAccount } from '@/utils/account';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';

export default function WalletPage() {
  const router = useRouter();
  const [existingPassword] = useLocalStorage('MY_PWD', '');
  const { walletId } = router.query;
  const [balance, setBalance] = useState(0);
  const [accountList, _] = useLocalStorage('WALLET_ACCOUNTS', {});
  const [showPrivate, setShowPrivate] = useState(false);
  const [revealPrivateKey, setRevealPrivateKey] = useState(false);
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (walletId) {
        const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
        const accountBalance = await provider.getBalance(walletId.toString());
        setBalance(
          toFixedIfNecessary(ethers.utils.formatEther(accountBalance))
        );
      }
    };
    fetchData();
  }, [walletId]);

  const revealKey = useCallback(
    async (recoveryPhrase: string) => {
      if (password === existingPassword) {
        setRevealPrivateKey(true);
        const result = await generateAccount(recoveryPhrase);
        setPrivateKey(result.account.privateKey);
      } else {
        toast.error('Wrong password!');
      }
    },
    [password, existingPassword]
  );

  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <div className='layout py-20 text-black'>
            {walletId && (
              <div>
                <h1 className='mb-2'>
                  Wallet: {accountList[walletId.toString()]?.walletName}
                </h1>
                <ArrowLink
                  direction='left'
                  className='mb-3 mt-2'
                  href='/wallets'
                >
                  Back to Wallets
                </ArrowLink>
                <div>
                  Address:{' '}
                  <a
                    className='text text-blue-500'
                    href={`https://goerli.etherscan.io/address/${walletId}`}
                  >
                    {walletId}
                  </a>
                </div>
                <div>
                  Balance: <b>{balance} ETH</b>
                </div>
                {revealPrivateKey && (
                  <div>
                    Private key: <b>{privateKey}</b>
                  </div>
                )}
                <Button
                  variant='primary'
                  onClick={() => setShowPrivate(!showPrivate)}
                  className='mt-2'
                >
                  View private key
                </Button>
                {showPrivate && (
                  <div className='mt-2'>
                    If you haven't entered the password, just leave it empty
                    <input
                      name='password'
                      id='password'
                      className={clsx(
                        'block max-w-xs rounded border',
                        'mt-2 border-gray-300 bg-white',
                        'focus:border-primary-400 focus:ring-primary-400 pl-2 focus:outline-none focus:ring'
                      )}
                      placeholder='Password'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <Button
                      variant='primary'
                      onClick={() =>
                        revealKey(accountList[walletId.toString()].seedPhrase)
                      }
                      className='mt-2'
                    >
                      View
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
