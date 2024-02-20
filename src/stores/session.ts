import { defineStore } from 'pinia';

export interface SessionState {
  authenticated: boolean,
  customerNumber?: string,
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    authenticated: false,
    customerNumber: undefined,
  }),
  persist: false,
});
