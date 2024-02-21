<template>
  <div v-if="$q.platform.is.nativeMobile">
    <q-btn
      color="primary"
      label="Toggle Camera"
      @click="cameraModalShown = !cameraModalShown"
    />
    <p>ERROR: {{ error }}</p>
    <p>RESULT: {{ result }}</p>
    <q-dialog
      v-model="cameraModalShown"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
        <q-card-section class="q-pt-none">
          <qrcode-stream :formats="codes" @detect="onDecode" @error="onError">
          </qrcode-stream>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { BarcodeType, BoundingBox, ScanResult } from './models';
import { QrcodeStream } from 'vue-qrcode-reader';
import { useQuasar } from 'quasar';

export interface CameraScannerProps {
  codes?: BarcodeType[];
}
withDefaults(defineProps<CameraScannerProps>(), {
  codes: () => ['qr_code', 'ean_13', 'ean_8'],
});

const emit = defineEmits<{
  'code-read-result': [value: ScanResult[]];
}>();

const $q = useQuasar();
const error = ref('');
const result = ref(null) as Ref<ScanResult[] | null>;
const cameraModalShown = ref(false);

async function onDecode(res: ScanResult[]) {
  result.value = res;
  emit('code-read-result', result.value);
  cameraModalShown.value = false;
}
async function onError(err: any) {
  error.value = `[${err.name}]: `;

  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission';
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device';
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)';
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?';
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable';
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser';
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
  } else {
    error.value += err.message;
  }
}
</script>
