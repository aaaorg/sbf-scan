<template>
  <q-card class="q-ma-md col-12 col-md-10 col-lg-6 col-xl-2">
    <q-card-section class="q-pa-md">
      <q-skeleton height="150px" square />
    </q-card-section>
    <q-card-section class="q-pa-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
        <q-btn
          :label="'📷 ' + $t('qrSetup')"
          color="primary"
          class="full-width"
        />
        <q-input
          filled
          v-model="customerNumber"
          :label="$t('customerNumber')"
          :hint="$t('serverAddressHint')"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || $t('serverAddressError'),
          ]"
        />

        <q-btn
          :label="$t('login')"
          type="submit"
          color="primary"
          class="full-width"
        />
        <q-btn
          :label="$t('reset')"
          type="reset"
          color="primary"
          flat
          class="full-width"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from 'stores/session';
import { useRouter } from 'vue-router';

const $store = useSessionStore();
const $router = useRouter();

const customerNumber = ref('');

function onSubmit() {
  $store.authenticated = true;
  $store.customerNumber = customerNumber.value;
  $router.push('/');
}

function onReset() {
  console.log('Reset');
}
</script>
