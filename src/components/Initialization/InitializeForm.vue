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
          <q-form
            @submit="onSubmit"
            @reset="onSettingsReset"
            class="q-gutter-y-md"
          >
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

            <q-toggle
              v-model="$settings.enableCamera"
              :label="$t('enableCamera')"
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
          <camera-scanner></camera-scanner>
        </q-tab-panel>

        <q-tab-panel name="two">
          <q-form @reset="onBrandingReset" class="q-gutter-y-md">
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
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { useSettingsStore } from 'stores/settings';
import { useRouter } from 'vue-router';
import { axios } from 'boot/axios';
import CameraScanner from 'components/CameraScanner.vue';

const $q = useQuasar();
const { t } = useI18n();
const $router = useRouter();
const $settings = useSettingsStore();

const tab: Ref<string> = ref('one');
const image: Ref<File | FileList | null | undefined> = ref(undefined);

async function onSubmit() {
  (await validateConnection()) ? onConfigured() : onValidationError();
}

function onSettingsReset() {
  $settings.url = undefined;
  $settings.apiKey = undefined;
  $settings.enableCamera = false;
}

function onBrandingReset() {
  $settings.storeName = 'Small Business Fridge';
  $settings.image = '/icons/favicon-128x128.png';
  image.value = undefined;
}

async function validateConnection() {
  return await axios
    .get('/api/scannerValidate', {
      headers: {
        'sbf-Api-Secret': $settings.apiKey,
      },
      baseURL: $settings.url,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

function onConfigured() {
  axios.defaults.baseURL = $settings.url;
  axios.defaults.headers.common['sb-Api-Secret'] = $settings.apiKey;
  $settings.configured = true;
  $router.push('/');
}

function onValidationError() {
  $q.notify({
    color: 'negative',
    message: t('validationError'),
  });
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
