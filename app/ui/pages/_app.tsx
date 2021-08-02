import Head from 'next/head'
import Image from 'next/image'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link';
function MyApp({ Component, pageProps }: AppProps) {
  return ( <div>
      <Head>
        <title>Simple Marketplace</title>
        <meta name="description" content="Simple Marketplace" />
        <link rel="icon" href="/products.svg" />
      </Head>

    <nav className='border-b p-6'>
      <p className='text-4xl font-bold text-red-700'>Simple Marketplace</p>
      <div className='flex mt-4'>
        <Link href='/'>
          <a className='mr-6 text-yellow-600'>
            Home
          </a>
        </Link>
        <Link href='/create-item'>
          <a className='mr-6 text-yellow-600'>
            Sell Digital Asset
          </a>
        </Link>
        <Link href='/my-assets'>
          <a className='mr-6 text-yellow-600'>
            My Digital Assets
          </a>
        </Link>
        <Link href='/creator-dashboard'>
          <a className='mr-6 text-yellow-600'>
            Creator Dashboard
          </a>
        </Link>
      </div>
    </nav>
    <Component {...pageProps} />
    <footer >
        <a
          href="https://github.com/maximilianou/weekly49/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span >
            <Image src="/products.svg" alt="Simple" width={172} height={36} />
          </span>
        </a>
      </footer>
    
  </div>)
}
export default MyApp
