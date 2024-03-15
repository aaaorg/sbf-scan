import { EventBus } from 'quasar';
import { boot } from 'quasar/wrappers';
import { ScanEventBus } from 'components/models';

export default boot(({ app }) => {
  // const bus = new EventBus<ScanEventBus>();

  const bus = new EventBus<{
    'scan-input': (value: string) => void;
    'some-event': (arg1: string) => void;
  }>();

  app.provide('bus', bus);
});
