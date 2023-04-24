import { useState } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from '@/hooks';
import clsx from 'clsx';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ArrowLink from '@/components/links/ArrowLink';

export default function SettingsPage() {
  const [existingPassword] = useLocalStorage('MY_PWD', '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20 text-black'>
            <h1>Password</h1>
            <ArrowLink direction='left' className='mb-3 mt-2' href='/'>
              Back to Home
            </ArrowLink>
            <div className='mt-2 flex flex-col flex-wrap gap-2'>
              <input
                name='oldPassword'
                id='oldPassword'
                className={clsx(
                  'block max-w-xs rounded border',
                  'border-gray-300 bg-white',
                  'focus:border-primary-400 focus:ring-primary-400 pl-2 focus:outline-none focus:ring'
                )}
                type='password'
                placeholder='Old password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              ></input>
              <input
                name='newPassword'
                id='newPassword'
                className={clsx(
                  'block max-w-xs rounded border',
                  'border-gray-300 bg-white',
                  'focus:border-primary-400 focus:ring-primary-400 pl-2 focus:outline-none focus:ring'
                )}
                type='password'
                placeholder='New password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
              <Button
                variant='primary'
                className='block max-w-xs'
                onClick={() => {
                  if (existingPassword === oldPassword) {
                    if (newPassword.length) {
                      localStorage.setItem(
                        'MY_PWD',
                        JSON.stringify(newPassword)
                      );
                      toast.success('Password updated!');
                    }
                  } else {
                    toast.error('Wrong old password!');
                  }
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
