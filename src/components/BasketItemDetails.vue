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

      <q-img :src="model?.product.imagePath" style="height: 50%" fit="contain">
        <div class="absolute-bottom text-h6">
          {{ model?.product.displayName }}
        </div>
      </q-img>

      <q-card-section v-if="model">
        <q-btn
          @click="removeFromBasket(model)"
          round
          color="primary"
          icon="delete"
        />
        <q-slider
          v-model="model.quantity"
          :min="1"
          :max="model.product.stockSum"
          label
          label-always
          style="width: 50%"
          class="absolute-center"
        />
      </q-card-section>

      <q-card-section v-if="model?.product.description" class="q-pt-none">
        {{ model.product.description }} {{ model.product.description }}
        {{ model.product.description }} {{ model.product.description }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ModelRef } from 'vue';
import { BasketItem } from './models';
import { useSessionStore } from 'stores/session';

const $session = useSessionStore();

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

function removeFromBasket(item: BasketItem) {
  // $session.basket.splice($session.basket.indexOf(item), 1);
  visible.value = false;
}
</script>
