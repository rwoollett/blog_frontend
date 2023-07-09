import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useApollo } from '../lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import '../components/page.module.scss';
import '../styles/main.scss';
import "../styles/css/uikit.min.css";
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { Provider } from '../context/users';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className="App">
      <Head>
        <title>Lab Apollo NextApp</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet='utf-8' />
        <meta
          name="viewport"
          content='initial-scale=1.0, width=device-width' />
      </Head>
      <Provider>
        <ApolloProvider client={apolloClient}>
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </Provider>
    </div>
  );
}
