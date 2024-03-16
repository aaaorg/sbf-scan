<template>
  <q-card class="q-ma-md col-12 col-md-10 col-lg-6 col-xl-2" flat>
    <q-card-section class="q-pa-md">
      <q-img
        v-if="$settings.image"
        height="150px"
        fit="contain"
        :src="$settings.image"
      ></q-img>
      <q-skeleton v-else height="150px" square />
    </q-card-section>
    <q-card-section class="q-pa-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
        <q-input
          filled
          ref="customerNumberRef"
          v-model="customerNumber"
          :label="$t('customerNumber')"
          :hint="$t('customerNumberHint')"
          lazy-rules
          :rules="[validateCustomerNumber]"
        />

        <q-btn
          :label="$t('login')"
          type="submit"
          color="primary"
          class="full-width"
          :loading="loadingAuth"
        />
        <q-btn
          :label="$t('reset')"
          type="reset"
          color="primary"
          flat
          class="full-width"
        />
      </q-form>
      <camera-scanner></camera-scanner>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { EventBus, QInput, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { Ref, inject, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingsStore } from 'stores/settings';
import { useSessionStore } from 'stores/session';
import { User } from '../models';
import CameraScanner from 'components/CameraScanner.vue';
import { axios } from 'boot/axios';

const $q = useQuasar();
const { t } = useI18n();
const $router = useRouter();
const $settings = useSettingsStore();
const $session = useSessionStore();
const bus = inject('bus') as EventBus;

const customerNumber = ref('');
const customerNumberRef: Ref<QInput | null> = ref(null);
const loadingAuth = ref(false);
const invalidCustomerNumbers: string[] = [];

onMounted(() => {
  bus.on('code-scanned', (value: string): void => {
    console.log('scanned authentication code: ' + value);
    customerNumber.value = value;
    onSubmit();
  });
});

onUnmounted(() => {
  bus.off('code-scanned');
});

async function onSubmit() {
  (await authenticate()) ? onAuthSuccess() : onAuthError();
}

function onReset() {
  customerNumber.value = '';
}

async function authenticate() {
  loadingAuth.value = true;
  return await axios
    .get('/api/scannerAuthUser?customer=' + customerNumber.value)
    .then((user) => {
      $session.customerNumber = customerNumber.value;
      $session.user = {
        id: user.data._id,
        displayName: user.data.displayName,
        supplier: user.data.supplier,
        favorites: [],
      } as User;
      loadingAuth.value = false;
      return true;
    })
    .catch(() => {
      loadingAuth.value = false;
      invalidCustomerNumbers.push(customerNumber.value);
      customerNumberRef.value?.validate();
      return false;
    });
}

function validateCustomerNumber(val: string) {
  if (!val) {
    return t('customerNumberRequiredError');
  }
  // if (val.length < 6) {
  //   return t('customerNumberLengthError');
  // }
  if (invalidCustomerNumbers.includes(val)) {
    return t('customerNumberNotExistsError');
  }
  return true;
}

function onAuthSuccess() {
  $router.push('/');
}

function onAuthError() {
  $q.notify({
    color: 'negative',
    message: t('customerNumberNotExistsError'),
  });
}
</script>
