import { Handbag } from '@phosphor-icons/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import camiseta from '../../assets/2.png';
import logoImg from '../../assets/logo.svg';
import { CartContextProvider } from '../../context/cartContext';
import { DialogContent, DialogRoot, DialogTrigger } from '../Dialog';
import {
  ButtonCart,
  CartContainer,
  ContentContainer,
  HeaderContainer,
  ImageContainer,
  Item,
  ItensContainer
} from './styles';

export function Header() {
  const router = useRouter();
  const { totalItems, cart, totalPrice, removeProductOnCart } = useContext(CartContextProvider);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleRemoveProductOnCart(productId: string) {
    removeProductOnCart(productId);
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      let priceIdArray = [];

      cart.map((item) => {
        priceIdArray.push(item.defaultPriceId);
      });

      const response = await axios.post('/api/checkout', {
        priceIdArray
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog, Sentry)
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!');
    }
  }

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" onClick={() => router.push('/')} />

      <DialogRoot>
        <DialogTrigger asChild>
          <ButtonCart outlined={totalItems > 0} disabled={totalItems === 0} >
            <Handbag size={24} />

            <span>{totalItems}</span>
          </ButtonCart>
        </DialogTrigger>
        <DialogContent>
            
          <CartContainer>
            <ItensContainer>
              {cart.map((item) => {
                return (
                  <Item key={item.id}>
                    <ImageContainer>
                      <Image src={item.imageUrl} width={200} height={200}  alt="" />
                    </ImageContainer>

                    <ContentContainer>
                      <p>{item.name}</p>
                      <span>{item.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}</span>
                      <button onClick={() => handleRemoveProductOnCart(item.id)}>Remover</button>
                    </ContentContainer>
                  </Item>
                );
              })}
            </ItensContainer>

            <footer>
              <div>
                <p>Quantidade</p>
                <span>{totalItems} {totalItems > 1 ? 'itens' : 'item'}</span>
              </div>

              <div>
                <p>Valor total</p>
                <span>{totalPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}</span>
              </div>

              <button 
                onClick={handleBuyProduct} 
                disabled={isCreatingCheckoutSession}
              >
                Finalizar compra
              </button>
            </footer>
          </CartContainer>
        </DialogContent>
          
      </DialogRoot>
    </HeaderContainer>
  );
}