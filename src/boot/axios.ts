import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useSettingsStore } from 'stores/settings';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

export default boot(({ store }) => {
  const settings = useSettingsStore(store);
  axios.defaults.baseURL = settings.url;
  axios.defaults.headers.common['sb-Api-Secret'] = settings.apiKey;
});

export { axios };
