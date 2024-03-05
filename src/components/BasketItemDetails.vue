<template>
  <q-dialog
    v-model="visible"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
      <q-card-section class="q-pt-none">
        {{ model?.product.displayName }}
        {{ model?.product.description }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ModelRef } from 'vue';
import { BasketItem } from './models';

export interface BasketItemDetailsProps {
  'v-model:item': BasketItem | null;
  'v-model:visible': boolean;
}
withDefaults(defineProps<BasketItemDetailsProps>(), {
  'v-model:item': null,
  'v-model:visible': false,
});

const model: ModelRef<BasketItem | null> = defineModel<BasketItem | null>(
  'item',
  {
    required: true,
  }
);
const visible: ModelRef<boolean> = defineModel<boolean>('visible', {
  required: true,
});
</script>
