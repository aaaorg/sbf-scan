import { defineStore } from 'pinia';

export interface SettingsState {
  url: string | undefined,
  apiKey: string | undefined,
  configured: boolean,
  skipCert: boolean,
  image: File | FileList | null | undefined,
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    url: undefined as string | undefined,
    apiKey: undefined as string | undefined,
    configured: false,
    skipCert: false,
    image: undefined as File | FileList | null | undefined,
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
