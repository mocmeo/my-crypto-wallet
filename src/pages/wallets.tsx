import clsx from 'clsx';
import { useState } from 'react';
import { HiPlus } from 'react-icons/hi';

import { useLocalStorage } from '@/hooks';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import { generateAccount } from '../utils/AccountUtils';

export default function WalletsPage() {
  const [accountList, setAccountList] = useLocalStorage('WALLET_ACCOUNTS', {});
  const [newWalletName, setNewWalletName] = useState('');

  async function confirmAccount(walletName: string) {
    const result = await generateAccount();
    setAccountList({
      ...accountList,
      [result.account.address]: walletName,
    });
  }

  return (
    <Layout>
      <Seo templateTitle='Wallets' description='Crypto Wallets' />

      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20 text-black'>
            <h1>Wallets</h1>
            <ArrowLink direction='left' className='mb-3 mt-2' href='/'>
              Back to Home
            </ArrowLink>

            <div className='flex flex-wrap gap-2'>
              <input
                name='walletName'
                id='walletName'
                className={clsx(
                  'block max-w-xs rounded border',
                  'border-gray-300 bg-white',
                  'focus:border-primary-400 focus:ring-primary-400 pl-2 focus:outline-none focus:ring'
                )}
                placeholder='Wallet name'
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)}
              ></input>
              <Button
                variant='primary'
                leftIcon={HiPlus}
                onClick={() => confirmAccount(newWalletName)}
              >
                Create wallet
              </Button>
            </div>

            <div className='mt-8 space-y-12'>
              <div className='space-y-2'>
                <div className='flex flex-col'>
                  {accountList && (
                    <div>
                      {Object.keys(accountList).map((key) => (
                        <div className='mb-2 flex flex-col' key={key}>
                          <div>
                            <ArrowLink href='/'>
                              <div>{accountList[key]}</div>
                            </ArrowLink>
                          </div>
                          <div>0x511B6...BaAC753E</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
