<template>
  <q-page class="row justify-evenly">
    <!-- <example-component
      title="Example component 2"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
    <q-list bordered class="full-width">
      <q-item
        v-for="item in items"
        :key="item.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ item.name }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption lines="1">{{ item.count }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';

const items = ref([
  { id: 1, image: 'something.png', name: 'John', count: 3 },
  { id: 2, image: 'something.png', name: 'John', count: 3 },
]);
</script>
