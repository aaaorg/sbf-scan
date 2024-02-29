<template>
  <q-page class="row justify-evenly">
    <!-- <example-component
      title="Example component 2"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->

    <q-list bordered class="full-width">
      <q-slide-item
        v-for="item in items"
        :key="item.id"
        @left="onReset"
        @right="onReset"
        right-color="red"
      >
        <template v-slot:left>
          <q-icon name="add" />
        </template>
        <template v-slot:right>
          <q-icon name="delete" />
        </template>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" size="4rem">
              {{ item.name }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <!-- <q-item-label caption lines="1">{{ item.count }}</q-item-label> -->
            <q-item-label>
              <q-btn
                round
                color="primary"
                icon="remove"
                @click="item.name = 'changed'"
                @click.stop
                @keypress.stop
              />
              <q-btn
                round
                color="primary"
                icon="add"
                class="q-mx-md"
                @click="item.name = 'changed'"
                @click.stop
                @keypress.stop
              />
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-field readonly borderless>
              <template v-slot:control>
                <div
                  class="text-nowrap text-right"
                  tabindex="0"
                  unselectable="on"
                >
                  328 Kč <br />
                  x2
                </div>
              </template>
            </q-field>
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>
    <camera-scanner></camera-scanner>
  </q-page>
</template>

<script setup lang="ts">
import CameraScanner from 'components/CameraScanner.vue';
import { ref } from 'vue';

function onReset({ reset }: { reset: () => void }) {
  reset();
}

const items = ref([
  {
    id: 1,
    image: 'something.png',
    name: 'Big Shock! Coffee - Espresso + Milf',
    count: 3,
  },
  {
    id: 2,
    image: 'something.png',
    name: 'Müsli tyčinky na slano rajčata a bazalka',
    count: 3,
  },
  { id: 3, image: 'something.png', name: 'John', count: 3 },
  { id: 4, image: 'something.png', name: 'John', count: 3 },
  { id: 5, image: 'something.png', name: 'John', count: 3 },
  { id: 6, image: 'something.png', name: 'John', count: 3 },
  { id: 7, image: 'something.png', name: 'John', count: 3 },
  { id: 8, image: 'something.png', name: 'John', count: 3 },
  { id: 9, image: 'something.png', name: 'John', count: 3 },
  { id: 10, image: 'something.png', name: 'John', count: 3 },
  { id: 11, image: 'something.png', name: 'John', count: 3 },
  { id: 12, image: 'something.png', name: 'John', count: 3 },
]);
</script>
