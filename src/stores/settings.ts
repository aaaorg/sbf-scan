import { defineStore } from 'pinia';

export interface SettingsState {
  configured: boolean,
  url?: string,
  apiKey?: string,
  storeName: string,
  image?: string,
  skipCert: boolean,
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    configured: false,
    url: undefined,
    apiKey: undefined,
    storeName: 'Small Business Fridge',
    image: undefined,
    skipCert: false,
  }),
  getters: {
    getUrl({url}): string | undefined { return url},
  },
  actions: {
    set_example_url() {
      this.url = 'https://example.com';
    },
  },
  persist: true,
});
