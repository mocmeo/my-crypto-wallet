import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <h1>Crypto Wallet</h1>
            <p className='mt-2 text-sm text-gray-800'>
              Crypto Wallet is the best ethereum wallet and cryptocurrency
              wallet to store your favourite tokens.
            </p>
            <ButtonLink className='mt-6' href='/wallets' variant='light'>
              View Wallets
            </ButtonLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
