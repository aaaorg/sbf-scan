import { EventBus } from 'quasar';
import { boot } from 'quasar/wrappers';
import { ScanEventBus } from 'components/models';

// Type global property on the app instance
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $bus: EventBus<ScanEventBus>;
  }
}

export default boot(({ app }) => {
  const bus = new EventBus<ScanEventBus>();

  // Allows injecting in Composition API <script setup>
  app.provide('bus', bus);

  // Allows access from the Options API and boot files app instance
  app.config.globalProperties.$bus = bus;
});
