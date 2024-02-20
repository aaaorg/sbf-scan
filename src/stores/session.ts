import { defineStore } from 'pinia';

export interface SessionState {
  authenticated: boolean
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    authenticated: false
  }),
  persist: false,
});
