import { defineStore } from 'pinia';

export interface SettingsState {
  url?: string,
  apiKey?: string,
  configured: boolean,
  skipCert: boolean,
  image: File | FileList | null | undefined,
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    url: undefined,
    apiKey: undefined,
    configured: false,
    skipCert: false,
    image: undefined,
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
