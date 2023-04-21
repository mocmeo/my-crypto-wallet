import clsx from 'clsx';
import * as React from 'react';
import { HiPlus } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import { colorList } from '@/constant';

type Color = (typeof colorList)[number];

export default function ComponentsPage() {
  const [color, setColor] = React.useState<Color>('sky');

  return (
    <Layout>
      <Seo
        templateTitle='Components'
        description='Pre-built components with awesome default'
      />

      <main>
        <section className={clsx('bg-white', color)}>
          <div className='layout min-h-screen py-20 text-black'>
            <h1>Wallets</h1>
            <ArrowLink direction='left' className='mb-3 mt-2' href='/'>
              Back to Home
            </ArrowLink>

            <div className='flex flex-wrap gap-2'>
              <input
                name='walletName'
                id='walletName'
                value={color}
                className={clsx(
                  'block max-w-xs rounded border',
                  'border-gray-300 bg-white',
                  'focus:border-primary-400 focus:ring-primary-400 pl-2 focus:outline-none focus:ring'
                )}
                placeholder='Wallet name'
                onChange={(e) => setColor(e.target.value as Color)}
              ></input>
              <Button variant='primary' leftIcon={HiPlus}>
                Create wallet
              </Button>
            </div>

            <div className='mt-8 space-y-12'>
              <div className='space-y-2'>
                <div className='flex flex-col'>
                  <div>
                    <div className='mb-2 flex flex-col'>
                      <div>
                        <ArrowLink href='/'>
                          <b>Wallet 1</b>
                        </ArrowLink>
                      </div>
                      <span>0x511B6...BaAC753E</span>
                    </div>

                    <div className='mb-2 flex flex-col'>
                      <div>
                        <ArrowLink href='/'>
                          <b>Wallet 2</b>
                        </ArrowLink>
                      </div>

                      <span>0x511B6...BaAC753E</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
