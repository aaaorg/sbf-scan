<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title> {{ $settings.storeName }} </q-toolbar-title>

        <div>{{ $session.user?.displayName }}</div>
      </q-toolbar>
    </q-header>

    <q-footer v-if="$session.authenticated">
      <q-toolbar>
        <div class="row full-width">
          <div class="col">
            <q-field readonly>
              <template v-slot:control>
                <div
                  class="self-center full-width no-outline text-nowrap text-white text-h5"
                  tabindex="0"
                >
                  20 položek
                </div>
              </template>
            </q-field>
          </div>
          <div class="col full-width">
            <!-- <q-btn
              round
              class="absolute-center"
              color="positive"
              icon="shopping_cart_checkout"
            /> -->
            <q-btn class="absolute-center" color="secondary">DOKONČIT</q-btn>
          </div>
          <div class="col">
            <q-field readonly>
              <template v-slot:control>
                <div
                  class="self-center full-width no-outline text-nowrap text-white text-h5 text-right"
                  tabindex="0"
                >
                  1 328 Kč
                </div>
              </template>
            </q-field>
          </div>
        </div>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useSettingsStore } from 'stores/settings';
import { useSessionStore } from 'stores/session';

const $settings = useSettingsStore();
const $session = useSessionStore();
</script>
