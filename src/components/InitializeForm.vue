<template>
  <q-card class="q-ma-md col-12 col-md-10 col-lg-6 col-xl-2">
    <q-card-section class="q-pa-md">
      <q-skeleton height="150px" square />
    </q-card-section>
    <q-card-section class="q-pa-md">
      <q-tabs v-model="tab">
        <q-tab :label="$t('setup')" name="one" />
        <q-tab :label="$t('advanced')" name="two" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
            <q-btn
              :label="'📷 ' + $t('qrSetup')"
              type="submit"
              color="primary"
              class="full-width"
            />
            <q-input
              filled
              v-model="store.url"
              :label="$t('serverAddress')"
              :hint="$t('serverAddressHint')"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || $t('serverAddressError'),
              ]"
            />

            <q-input
              filled
              v-model="store.apiKey"
              :label="$t('apiKey')"
              :hint="$t('apiKeyHint')"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || $t('apiKeyError')]"
              type="password"
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
        </q-tab-panel>

        <q-tab-panel name="two">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
            <q-input
              filled
              v-model="store.url"
              :label="$t('customStoreName')"
              hint="Small Business Fridge"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-file v-model="store.image" :label="$t('customStoreLogo')">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <q-toggle
              v-model="store.skipCert"
              :label="$t('skipCertValidation')"
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

const store = useSettingsStore();
const tab: Ref<string> = ref('one');

const $router = useRouter();

function onSubmit() {
  store.configured = true;
  $router.push('/');
}

function onReset() {
  store.apiKey += 'bb';
  return store.apiKey;
}
</script>
