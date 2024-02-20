<template>
  <div>SCAN RESULT: {{ intentValue }}</div>
  <q-btn color="primary" label="Send Intent" @click="sendIntent" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CapacitorIntents } from 'capacitor-android-intents';

export interface ScanInputProps {
  title?: string;
}
withDefaults(defineProps<ScanInputProps>(), {
  title: 'Scan Input',
});

const intentValue = ref('');
let receiverId: string | null = null;

const rId = await CapacitorIntents.registerBroadcastReceiver(
  { filters: ['device.scanner.EVENT'] },
  async (data) => {
    console.dir(data);

    if (data.extras.hasOwnProperty('EXTRA_EVENT_DECODE_VALUE')) {
      let stringValue = new TextDecoder().decode(
        new Uint8Array(data.extras['EXTRA_EVENT_DECODE_VALUE'])
      );
      intentValue.value = stringValue;
    }

    // now unregister
    if (receiverId !== null) {
      await CapacitorIntents.unregisterBroadcastReceiver({ id: receiverId });
      receiverId = null;
    }
    console.log(rId);
  }
);

async function sendIntent() {
  await CapacitorIntents.sendBroadcastIntent({
    action: 'device.scanner.EVENT',
    value: { testValue: 'Test String' },
  });
}
</script>
