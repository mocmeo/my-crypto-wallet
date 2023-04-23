import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@/hooks';
import { ethers } from 'ethers';
import { goerli } from '@/models/Chain';
import { toFixedIfNecessary } from '@/utils/AccountUtils';
import { isClient } from '@/utils';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';

export default function WalletPage() {
  const router = useRouter();
  const { walletAdr } = router.query;
  const [balance, setBalance] = useState(0);
  const [accountList, _] = useLocalStorage('WALLET_ACCOUNTS', {});

  useEffect(() => {
    const fetchData = async () => {
      if (walletAdr) {
        const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
        let accountBalance = await provider.getBalance(walletAdr.toString());
        setBalance(
          toFixedIfNecessary(ethers.utils.formatEther(accountBalance))
        );
      }
    };
    fetchData();
  }, [walletAdr]);

  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <div className='layout py-20 text-black'>
            {walletAdr && (
              <div>
                <h1 className='mb-2'>
                  Wallet: {accountList[walletAdr.toString()]}
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
                    href={`https://goerli.etherscan.io/address/${walletAdr}`}
                  >
                    {walletAdr}
                  </a>
                </div>
                <div>Balance: {balance} ETH</div>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
