import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useSettingsStore } from 'stores/settings';

// Type global property on the app instance
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

export default boot(({ app, store }) => {

  const settings = useSettingsStore(store);
  // TODO: This seems to work after restarting the app - how to make it work instantly?
  axios.defaults.baseURL = settings.url;
  axios.defaults.headers.common['sbf-Api-Secret'] = settings.apiKey;

  // Allows access from the Options API and boot files app instance
  app.config.globalProperties.$axios=axios
});

export { axios };
