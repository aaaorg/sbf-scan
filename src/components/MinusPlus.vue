<template>
  <div class="row q-col-gutter-sm">
    <div class="col-shrink">
      <q-btn
        round
        color="primary"
        icon="remove"
        @click="decreaseQuantity()"
        @click.stop
        @keypress.stop
      />
    </div>
    <div class="col-shrink">
      <q-btn
        round
        color="primary"
        icon="add"
        :disable="basketItem.quantity >= basketItem.product.stockSum"
        @click="increaseQuantity()"
        @click.stop
        @keypress.stop
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from 'stores/session';
import { BasketItem } from './models';

export interface MinusPlusProps {
  basketKey: string;
}
const props = withDefaults(defineProps<MinusPlusProps>(), {
  basketKey: '',
});

const $session = useSessionStore();
const basketItem = $session.basket.get(props.basketKey) as BasketItem;

function increaseQuantity() {
  basketItem.quantity++;
}

function decreaseQuantity() {
  basketItem.quantity--;
  if (basketItem.quantity < 1) {
    $session.basket.delete(props.basketKey);
  }
}
</script>
