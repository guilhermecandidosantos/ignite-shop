import { produce } from 'immer';

import { IProduct } from '../../context/cartContext';
import { Actions } from './action';

export interface CartState {
  cart: IProduct[],
  totalItems: number,
  totalPrice: number
}

interface ActionsProps {
  type: Actions
  payload?: {
    product?: IProduct
    productId?: string
  }
}

export function cartReducer(state: CartState, action: ActionsProps) {
  switch (action.type) {
    case Actions.ADD_PRODUCT_ON_CART:
      return produce(state, (draft) => {
        if(action.payload.product) {
          draft.cart.push(action.payload.product);
          draft.totalItems += 1;
          draft.totalPrice += action.payload.product.price;

          if(typeof window !== 'undefined') {
            localStorage.setItem('@ignite-shop-1.0.0', JSON.stringify({
              cart: draft.cart,
              totalItems: draft.totalItems,
              totalPrice: draft.totalPrice,
            }));
          }
        }
      });
    case Actions.REMOVE_PRODUCT_ON_CART: {
      const currentIndex = state.cart.findIndex((product) => {
        return product.id === action.payload.productId;
      });

      return produce(state, (draft) => {
        draft.totalItems -= 1;
        draft.totalPrice -= draft.cart[currentIndex].price;
        draft.cart.splice(currentIndex, 1);

        if(typeof window !== 'undefined') {
          localStorage.setItem('@ignite-shop-1.0.0', JSON.stringify({
            cart: draft.cart,
            totalItems: draft.totalItems,
            totalPrice: draft.totalPrice,
          }));
        }
      });

    }
    case Actions.CLEAR_STATE: {
      return produce(state, (draft) => {
        draft.cart = [];
        draft.totalItems = 0;
        draft.totalPrice = 0;

        if(typeof window !== 'undefined') {
          localStorage.setItem('@ignite-shop-1.0.0', JSON.stringify({
            cart: [],
            totalItems: 0,
            totalPrice:0,
          }));
        }
      });
      
    }
    default:
      return state;
  }
}