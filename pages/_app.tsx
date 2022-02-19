import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import 'todomvc-app-css/index.css';
import { StoreContext } from '../contexts/store-context';
import { Store } from '../models/store';

function MyApp({ Component, pageProps }: AppProps) {
  const store = new Store();

  return (
    <StoreContext.Provider value={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreContext.Provider>
  );
}

export default MyApp;
