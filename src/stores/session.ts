import { defineStore } from 'pinia';
import { User, BasketItem } from 'components/models';

export interface SessionState {
  customerNumber?: string,
  user?: User,
  basket: BasketItem[]
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    customerNumber: undefined,
    user: undefined,
    basket: []
  }),
  getters: {
    authenticated: (state) => state.user !== undefined,
    totalPrice: (state) => state.basket?.reduce((acc, basketItem) => acc + basketItem.product.price, 0),
  },
  persist: false,
});
