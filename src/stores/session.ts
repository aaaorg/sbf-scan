import { defineStore } from 'pinia';
import { User } from 'components/models';

export interface SessionState {
  customerNumber?: string,
  user?: User
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    customerNumber: undefined,
    user: undefined,
  }),
  getters: {
    authenticated: (state) => state.user !== undefined,
  },
  persist: false,
});
