import { defineStore } from 'pinia';
import { User, BasketItem } from 'components/models';

export interface SessionState {
  customerNumber?: string,
  user?: User,
  basket: Map<string, BasketItem>
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    customerNumber: undefined,
    user: undefined,
    basket: new Map<string, BasketItem>()
  }),
  getters: {
    authenticated: (state) => state.user !== undefined,
    totalPriceTyped(state): number {
      let  sum = 0;
      state.basket.forEach((basketItem) => sum += basketItem.totalPrice);
      return sum
    },
    totalProductsTyped(state): number {
      let sum = 0;
      state.basket.forEach((basketItem) => sum += basketItem.quantity);
      return sum
    },
    // totalPrice: (state) => state.basket.forEach((basketItem) => 0 + basketItem.product.stock[0].price * basketItem.quantity),
    // totalPrice: (state) => state.basket?.reduce((acc, basketItem) => acc + (basketItem.product.price * basketItem.quantity), 0),
    // totalProducts: (state) => state.basket?.reduce((acc, basketItem) => acc + basketItem.quantity, 0)
  },
  persist: false,

});
