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
