import { AppProps } from 'next/app';
import StoreProvider from '@/app/StoreProvider';
import { makeStore } from '../lib/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default MyApp;