import * as React from 'react';
import clsx from 'clsx';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function SettingsPage() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20 text-black'>
            <h1>Password</h1>
            <div className='mt-2 flex flex-wrap gap-2'>
              <input
                name='oldPassword'
                id='oldPassword'
                className={clsx(
                  'block max-w-xs rounded border',
                  'border-gray-300 bg-white',
                  'focus:border-primary-400 focus:ring-primary-400 pl-2 focus:outline-none focus:ring'
                )}
                placeholder='Old password'
                value={''}
                // onChange={(e) => setNewWalletName(e.target.value)}
              ></input>
              <input
                name='newPassword'
                id='newPassword'
                className={clsx(
                  'block max-w-xs rounded border',
                  'border-gray-300 bg-white',
                  'focus:border-primary-400 focus:ring-primary-400 pl-2 focus:outline-none focus:ring'
                )}
                placeholder='New password'
                value={''}
                // onChange={(e) => setNewWalletName(e.target.value)}
              ></input>
              <Button variant='primary' onClick={() => {}}>
                Update
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
