import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Stripe from 'stripe';

import Skeleton from '../../components/Skeleton';
import { CartContextProvider } from '../../context/cartContext';
import { stripe } from '../../lib/stripe';
import { 
  ImageContainer, 
  ProductContainer,
  ProductDetails
} from '../../styles/pages/product';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  const { addProductOnCart } = useContext(CartContextProvider);
  const  router = useRouter();
  
  async function handleAddProductOnCart() {
    addProductOnCart(product);
  }

  if(router.isFallback) {
    return (
      <>
        <Head>
          <title>Produto Ignite Shop</title>
        </Head> 
        
        <ProductContainer>
          <ImageContainer>
            <Skeleton height="100%" />
          </ImageContainer>
  
          <ProductDetails>
            <h1>
              <Skeleton width={300} height={20} />
            </h1>
            <span>
              <Skeleton width={100} height={28} />
            </span>
  
            <p>
              <Skeleton width="500px" count={5} />
            </p>
  
            <button 
              onClick={handleAddProductOnCart} 
            >
              Colocar na sacola
            </button>
          </ProductDetails>
        </ProductContainer>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head> 
      
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price.toLocaleString('pt-BR', { 
            style: 'currency', currency: 'BRL'
          })}</span>

          <p>{product.description}</p>

          <button 
            onClick={handleAddProductOnCart} 
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: {  id: 'prod_RetKFpg0DWtKrG' } }
    ],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1
  };
};