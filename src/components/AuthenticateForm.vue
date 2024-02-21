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
        <q-btn
          :label="'📷 ' + $t('qrSetup')"
          color="primary"
          class="full-width"
        />
        <q-input
          filled
          v-model="customerNumber"
          :label="$t('customerNumber')"
          :hint="$t('customerNumberHint')"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || $t('customerNumberError'),
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
import { useSettingsStore } from 'stores/settings';
import { useRouter } from 'vue-router';

const $settings = useSettingsStore();
const $session = useSessionStore();
const $router = useRouter();

const customerNumber = ref('');

function onSubmit() {
  $session.authenticated = true;
  $session.customerNumber = customerNumber.value;
  $router.push('/');
}

function onReset() {
  customerNumber.value = '';
}
</script>
