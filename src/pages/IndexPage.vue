<template>
  <q-page class="row justify-evenly">
    <basket-list></basket-list>
    <camera-scanner></camera-scanner>
  </q-page>
</template>

<script setup lang="ts">
import CameraScanner from 'components/CameraScanner.vue';
import BasketList from 'components/BasketList.vue';
</script>
