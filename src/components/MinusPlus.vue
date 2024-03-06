<template>
  <div class="row">
    <div class="col">
      <q-btn
        round
        color="primary"
        icon="remove"
        @click="decreaseQuantity(model)"
        @click.stop
        @keypress.stop
      />
    </div>
    <div class="col">
      <q-btn
        round
        color="primary"
        icon="add"
        :disable="model.quantity >= model.product.maxQuantity"
        @click="increaseQuantity(model)"
        @click.stop
        @keypress.stop
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from 'stores/session';
import { BasketItem } from 'components/models';
import { ModelRef } from 'vue';

const $session = useSessionStore();

export interface BasketItemDetailsProps {
  'v-model': BasketItem;
}

const model: ModelRef<BasketItem> = defineModel<BasketItem>({
  required: true,
});

function increaseQuantity(item: BasketItem) {
  item.quantity++;
}

function decreaseQuantity(item: BasketItem) {
  item.quantity--;
  if (item.quantity <= 0) {
    $session.basket.splice($session.basket.indexOf(item), 1);
  }
}
</script>
