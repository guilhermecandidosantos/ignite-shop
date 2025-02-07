import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import Stripe from 'stripe';

import { CartContextProvider } from '../context/cartContext';
import { stripe } from '../lib/stripe';
import { ImageBackground, ImageContainer, SuccessContainer } from '../styles/pages/success';

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearStateShop } = useContext(CartContextProvider);

  useEffect(() => {
    clearStateShop();
  }, [clearStateShop]);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head> 

      <SuccessContainer>
        <h1>Compra efetuada!</h1>      

        {/* <Image src={product.imageUrl} width={120} height={110} alt="" /> */}
        <ImageContainer>
          {products.map((product, i) => {
            return (
              <ImageBackground key={i}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </ImageBackground>
            );

          })}
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length} 
          {products.length === 1 ? ' camiseta ' : ' camisetas '}já está a caminho da sua casa. 
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }
  
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  const lineItems = session.line_items.data.map((item) => {
    return item.price.product as Stripe.Product;
  });

  const products = lineItems.map((item) => {
    return {
      name: item.name,
      imageUrl: item.images[0],
    };
  });

  return {
    props: {
      customerName,
      products
    }
  };
};