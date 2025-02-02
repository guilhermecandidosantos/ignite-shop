import 'keen-slider/keen-slider.min.css';

import { CaretLeft, CaretRight, Handbag } from '@phosphor-icons/react';
import { useKeenSlider } from 'keen-slider/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { MouseEvent, useContext, useState } from 'react';
import Stripe from 'stripe';

import { CartContextProvider } from '../context/cartContext';
import { stripe } from '../lib/stripe';
import { ProductItemContainer } from '../styles/pages/app';
import { ButtonBuy, ButtonLeft, ButtonRight, HomeContainer, Product } from '../styles/pages/home';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string
  }[]
}

interface IItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number
  description: string;
  defaultPriceId: string
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addProductOnCart } = useContext(CartContextProvider);

  let totalSlides = 0;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48
    },
    slideChanged(slide) {
      setCurrentSlide(slide.track.details.rel);
      totalSlides = slide.track.details.length;
    }
  });

  async function handleAddProductOnCart(event: MouseEvent ,item: IItem) {
    event.preventDefault();
    addProductOnCart(item);
  };

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head> 

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <ProductItemContainer key={product.id}>
              <Product 
                href={`/product/${product.id}`}
                  
                className="keen-slider__slide"
                prefetch={false}
              >
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}</span>
                  </div>

                  <ButtonBuy onClick={(event) => handleAddProductOnCart(event, product)} >
                    <Handbag size={24} weight="bold" />
                  </ButtonBuy>
                </footer>
              </Product>
            </ProductItemContainer>
          );
        })}

        {currentSlide > 0 &&
          (
            <ButtonLeft onClick={() => instanceRef.current.prev()}>
              <CaretLeft size={28}  />
            </ButtonLeft>
          )
        }

        {currentSlide === totalSlides &&
        (
          <ButtonRight onClick={() => instanceRef.current.next()}>
            <CaretRight size={28} />
          </ButtonRight>
        )
        }
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      describe: product.description,
      defaultPriceId: price.id
    };
  });

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 //2 hours
  };
};