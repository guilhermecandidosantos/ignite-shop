import { IProduct } from '../../context/cartContext';

export enum Actions {
  ADD_PRODUCT_ON_CART = 'ADD_PRODUCT_ON_CART',
  REMOVE_PRODUCT_ON_CART = 'REMOVE_PRODUCT_ON_CART',
  CLEAR_STATE = 'CLEAR_STATE',
}

export function addCoffee(product: IProduct) {
  return {
    type: Actions.ADD_PRODUCT_ON_CART,
    payload: { product },
  };
}

export function removeProduct(productId: string) {
  return {
    type: Actions.REMOVE_PRODUCT_ON_CART,
    payload: { productId },
  };
}

export function clearState() {
  return {
    type: Actions.CLEAR_STATE,
  };
}