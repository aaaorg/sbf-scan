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
      <q-tabs v-model="tab">
        <q-tab :label="$t('setup')" name="one" />
        <q-tab :label="$t('advanced')" name="two" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated swipeable>
        <q-tab-panel name="one">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
            <q-btn
              :label="'📷 ' + $t('qrSetup')"
              color="primary"
              class="full-width"
            />
            <q-input
              filled
              v-model="$settings.url"
              :label="$t('serverAddress')"
              :hint="$t('serverAddressHint')"
              lazy-rules
              :rules="[(val) => isValidUrl(val) || $t('serverAddressError')]"
            />

            <q-input
              filled
              v-model="$settings.apiKey"
              :label="$t('apiKey')"
              :hint="$t('apiKeyHint')"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || $t('apiKeyError')]"
              type="password"
              autocom
            />

            <q-btn
              :label="$t('submit')"
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
          <q-space />
        </q-tab-panel>

        <q-tab-panel name="two">
          <q-form @reset="onResetAdvanced" class="q-gutter-y-md">
            <q-input
              filled
              v-model="$settings.storeName"
              :label="$t('customStoreName')"
              hint="Small Business Fridge"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-file
              v-model="image"
              :label="$t('customStoreLogo')"
              @update:model-value="updateLogo"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <q-btn
              :label="$t('reset')"
              type="reset"
              color="primary"
              flat
              class="full-width"
            />
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useSettingsStore } from 'stores/settings';
import { useRouter } from 'vue-router';
import { axios } from 'boot/axios';

const $settings = useSettingsStore();
const $router = useRouter();
const tab: Ref<string> = ref('one');
const image: Ref<File | FileList | null | undefined> = ref(undefined);

function onSubmit() {
  validateConnection() ? onConfigured() : onValidationError();
}

function onReset() {
  $settings.url = undefined;
  $settings.apiKey = undefined;
}

function onResetAdvanced() {
  $settings.storeName = 'Small Business Fridge';
  $settings.image = '/icons/favicon-128x128.png';
  image.value = undefined;
}

function validateConnection() {
  // TODO: Call the API to validate the connection
  return true;
}

function onConfigured() {
  axios.defaults.baseURL = $settings.url;
  axios.defaults.headers.common['sb-Api-Secret'] = $settings.apiKey;
  $settings.configured = true;
  $router.push('/');
}

function onValidationError() {
  console.log('Validation Error');
}

function updateLogo(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (typeof e.target?.result === 'string')
      $settings.image = e.target?.result;
  };
  reader.readAsDataURL(file);
}

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
</script>
