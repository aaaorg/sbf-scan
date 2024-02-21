<template>
  <div>
    <!-- <p>{{ title }}</p> -->

    <p>{{ $t('success') }}</p>
    <!-- <p>{{ localeString }}</p>
    <p>{{ isoLocale }}</p> -->
    <!-- <q-btn @click="changeLanguage('cs')" label="CZ" /> -->
    <!-- <q-btn @click="changeLanguage('en-US')" label="EN" /> -->

    <suspense>
      <scan-input />
    </suspense>
    <camera-scanner v-on:code-read-result="updateResult" />
    <q-btn to="/initialize" label="Initialize" />
    <p>Result: {{ result }}</p>
    <!-- <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul> -->
    <!-- <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p> -->
    <!-- <p>Active: {{ active ? 'yes' : 'no' }}</p> -->
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Todo, Meta, ScanResult } from './models';
import { useI18n } from 'vue-i18n';
import ScanInput from './ScanInput.vue';
import CameraScanner from './CameraScanner.vue';
const { locale } = useI18n({ useScope: 'global' });

const $q = useQuasar();
const localeString = $q.lang.getLocale();
const isoLocale = $q.lang.isoName;
const result = ref('');

window.addEventListener('sendIntentReceived', () => {
  increment();
  console.log('received intent');
});

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
});

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

function changeLanguage(value: string) {
  locale.value = value;
}

function updateResult(value: ScanResult[]) {
  console.log('updateResult', value);
  result.value = value[0].rawValue;
}

const todoCount = computed(() => props.todos.length);
</script>
