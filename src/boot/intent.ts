import { boot } from 'quasar/wrappers';
import { CapacitorIntents } from 'capacitor-android-intents';

// On native mobile register a broadcast receiver for the device scanner event
export default boot(async ({ app }) => {
  if (app.config.globalProperties.$q.platform.is.nativeMobile) {
    await CapacitorIntents.registerBroadcastReceiver(
      { filters: ['device.scanner.EVENT'] },
      async (data) => {
        // If the broadcast intent decode was successful and the value is present, emit the code-scanned event
        if (
          data?.extras['EXTRA_EVENT_DECODE_RESULT'] === true &&
          data?.extras?.hasOwnProperty('EXTRA_EVENT_DECODE_VALUE')
        ) {
          const stringValue = new TextDecoder().decode(
            new Uint8Array(data.extras['EXTRA_EVENT_DECODE_VALUE'])
          );
          // Register input handle on respective screens
          app.config.globalProperties.$bus.emit('code-scanned', stringValue);
        } else {
          // Register some notification to the user that the scan failed
          app.config.globalProperties.$bus.emit('scan-failed');
        }
      }
    );
  }
});
