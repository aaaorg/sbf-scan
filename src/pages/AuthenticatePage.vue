<template>
  <q-page class="row items-center justify-evenly">
    <q-btn @click="login">LOGIN</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { useSessionStore } from 'stores/session';
import { useRouter } from 'vue-router';

const $store = useSessionStore();
const $router = useRouter();

async function login() {
  $store.authenticated = true;
  $router.push('/');
}
</script>
