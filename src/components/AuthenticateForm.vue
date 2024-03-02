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
        <!-- <q-btn
          :label="$t('reset')"
          color="primary"
          flat
          class="full-width"
          @click="resetValidation"
        /> -->
      </q-form>
      <camera-scanner></camera-scanner>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QInput, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingsStore } from 'stores/settings';
import { useSessionStore } from 'stores/session';
import { User } from 'components/models';
import { axios } from 'boot/axios';
import CameraScanner from './CameraScanner.vue';

const $q = useQuasar();
const { t } = useI18n();
const $router = useRouter();
const $settings = useSettingsStore();
const $session = useSessionStore();

const customerNumber = ref('');
const customerNumberRef: Ref<QInput | null> = ref(null);
const loadingAuth = ref(false);
const invalidCustomerNumbers: string[] = [];

async function onSubmit() {
  (await authenticate()) ? onAuthSuccess() : onAuthError();
}

function onReset() {
  customerNumber.value = '';
}

// Simulate an API call delay
function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function authenticate() {
  loadingAuth.value = true;
  //TODO: Call the API to authenticate the user
  // Currently emulating bad auth
  await sleep(1000);
  if (customerNumber.value === '123456') {
    invalidCustomerNumbers.push(customerNumber.value);
    customerNumberRef.value?.validate();
    loadingAuth.value = false;
    return false;
  } else {
    loadingAuth.value = false;
    return true;
  }
}

// function resetValidation() {
//   qinput.value?.resetValidation();
// }

function validateCustomerNumber(val: string) {
  if (!val) {
    return t('customerNumberRequiredError');
  }
  if (val.length < 6) {
    return t('customerNumberLengthError');
  }
  if (invalidCustomerNumbers.includes(val)) {
    return t('customerNumberNotExistsError');
  }
  return true;
}

function onAuthSuccess() {
  $session.customerNumber = customerNumber.value;
  $session.user = {
    id: '1',
    displayName: 'Example Customer',
    supplier: false,
    favorites: [],
  } as User;
  $router.push('/');
}

function onAuthError() {
  $q.notify({
    color: 'negative',
    message: t('customerNumberNotExistsError'),
  });
}
</script>
