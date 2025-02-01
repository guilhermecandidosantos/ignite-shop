import { Handbag, X } from '@phosphor-icons/react';
import { AppProps } from 'next/app';
import Image from 'next/image';
import { useRouter  } from 'next/router';

import camiseta from '../assets/2.png';
import logoImg from '../assets/logo.svg';
import { DialogContent, DialogRoot, DialogTrigger } from '../components/dialog';
import { globalStyles } from '../styles/global';
import { 
  ButtonCart, 
  CartContainer, 
  Container, 
  ContentContainer, 
  Header, 
  ImageContainer, 
  Item,
  ItensContainer
} from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" onClick={() => router.push('/')} />

        <DialogRoot>
          <DialogTrigger asChild>
            <ButtonCart outlined={false} >
              <Handbag size={24} />

              <span>1</span>
            </ButtonCart>
          </DialogTrigger>
          <DialogContent>
            
            <CartContainer>
              <ItensContainer>
                {Array.from({ length: 4 }, (_, i) => {
                  return (
                    <Item key={i}>
                      <ImageContainer>
                        <Image src={camiseta} alt="" />
                      </ImageContainer>

                      <ContentContainer>
                        <p>Camiseta Beyond the Limits</p>
                        <span>R$ 79,90</span>
                        <button>Remover</button>
                      </ContentContainer>
                    </Item>
                  );
                })}
              </ItensContainer>

              <footer>
                <div>
                  <p>Quantidade</p>
                  <span>3 itens</span>
                </div>

                <div>
                  <p>Valor total</p>
                  <span>R$ 270,00</span>
                </div>

                <button>Finalizar compra</button>
              </footer>
            </CartContainer>
          </DialogContent>
          
        </DialogRoot>
      </Header>

      <Component {...pageProps} />

    </Container>
  );
}
