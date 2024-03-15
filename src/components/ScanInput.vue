<template>
  <span></span>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { CapacitorIntents } from 'capacitor-android-intents';
import { inject } from 'vue';
import { ScanEventBus } from './models';

export interface ScanInputProps {
  title?: string;
}
withDefaults(defineProps<ScanInputProps>(), {
  title: 'Scan Input',
});

const $q = useQuasar();
const intentValue = ref('');
const bus = inject('bus') as ScanEventBus;

let receiverId: string | null = null;

onMounted(async () => {
  console.log('ScanInput onMounted');
  if ($q.platform.is.nativeMobile) {
    const rId = await CapacitorIntents.registerBroadcastReceiver(
      { filters: ['device.scanner.EVENT'] },
      async (data) => {
        console.dir(data);

        if (data.extras.hasOwnProperty('EXTRA_EVENT_DECODE_VALUE')) {
          let stringValue = new TextDecoder().decode(
            new Uint8Array(data.extras['EXTRA_EVENT_DECODE_VALUE'])
          );
          intentValue.value = stringValue;
          bus.emit('scan-input', stringValue);
        }

        // now unregister
        if (receiverId !== null) {
          await CapacitorIntents.unregisterBroadcastReceiver({
            id: receiverId,
          });
          receiverId = null;
        }
        console.log(rId);
      }
    );
  }
});

// onUnmounted(async () => {
//   if ($q.platform.is.nativeMobile) {
//     const rId = await CapacitorIntents.registerBroadcastReceiver(
//       { filters: ['device.scanner.EVENT'] },
//       async (data) => {
//         console.dir(data);

//         if (data.extras.hasOwnProperty('EXTRA_EVENT_DECODE_VALUE')) {
//           let stringValue = new TextDecoder().decode(
//             new Uint8Array(data.extras['EXTRA_EVENT_DECODE_VALUE'])
//           );
//           intentValue.value = stringValue;
//         }

//         // now unregister
//         if (receiverId !== null) {
//           await CapacitorIntents.unregisterBroadcastReceiver({
//             id: receiverId,
//           });
//           receiverId = null;
//         }
//         console.log(rId);
//       }
//     );
//   }
// });

async function sendIntent() {
  await CapacitorIntents.sendBroadcastIntent({
    action: 'device.scanner.EVENT',
    value: { testValue: 'Test String' },
  });
}
</script>
