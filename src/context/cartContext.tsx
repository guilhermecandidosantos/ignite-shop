import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';

import { addCoffee, clearState, removeProduct } from '../reducer/cartReducer/action';
import { cartReducer, CartState } from '../reducer/cartReducer/reducer';

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  defaultPriceId: string;
}

interface ICartContextType {
  addProductOnCart: (product: IProduct) => void
  removeProductOnCart: (productId: string) => void
  clearStateShop: () => void
  totalItems: number
  cart: IProduct[]
  totalPrice: number
}

export const CartContextProvider = createContext({} as ICartContextType);

interface ICartContextProps {
  children: ReactNode
}

export function CartContext({ children }: ICartContextProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      cart: [],
      totalItems: 0,
      totalPrice: 0
    },
    (initialState) => {
      if(typeof window !== 'undefined') {
        const storedAsJson = localStorage.getItem('@ignite-shop-1.0.0');

        if(storedAsJson) {
          return JSON.parse(storedAsJson);
        }

        localStorage.setItem('@ignite-shop-1.0.0', JSON.stringify({
          cart: [],
          totalItems: 0,
          totalPrice: 0
        }));

      }
      return initialState;
      
    }
  );

  const { totalItems, cart, totalPrice } = cartState as CartState;

  function addProductOnCart(product: IProduct) {
    dispatch(addCoffee(product));
  }
  
  function removeProductOnCart(productId: string) {
    dispatch(removeProduct(productId));
  }

  function clearStateShop() {
    dispatch(clearState());
  }

  if(!isClient) {
    return;
  }

  return (
    <CartContextProvider.Provider value={{ 
      addProductOnCart,
      removeProductOnCart,
      totalItems, 
      cart,
      totalPrice,
      clearStateShop
    }}>
      {children}
    </CartContextProvider.Provider>
  );
}