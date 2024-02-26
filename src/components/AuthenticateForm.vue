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
import { useRouter } from 'vue-router';
import { useSettingsStore } from 'stores/settings';
import { useSessionStore } from 'stores/session';
import { User } from 'components/models';
import { axios } from 'boot/axios';

const $router = useRouter();
const $settings = useSettingsStore();
const $session = useSessionStore();

const customerNumber = ref('');

function onSubmit() {
  authenticate() ? onAuthSuccess() : onAuthError();
}

function onReset() {
  customerNumber.value = '';
}

function authenticate() {
  //TODO: Call the API to authenticate the user
  return true;
}

function onAuthSuccess() {
  $session.customerNumber = customerNumber.value;
  $session.user = {
    displayName: 'Example Customer',
    supplier: false,
    favorites: [],
  } as User;
  $router.push('/');
}

function onAuthError() {
  console.log('Authentication failed');
}
</script>
