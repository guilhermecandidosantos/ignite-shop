import { AppProps } from 'next/app';

import { Header } from '../components/Header';
import { CartContext } from '../context/cartContext';
import { globalStyles } from '../styles/global';
import { Container } from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartContext>
        <Header />

        <Component {...pageProps} />
      </CartContext>

    </Container>
  );
}
