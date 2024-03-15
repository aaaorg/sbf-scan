<template>
  <q-list bordered class="full-width">
    <q-slide-item
      v-for="(item, index) in $session.basket"
      :key="item.product.id"
      ref="basketItems"
      @left="maxItem(index)"
      @right="removeItem(index, { reset: () => {} })"
      right-color="red"
    >
      <template v-slot:left>
        <q-icon name="add" />
      </template>
      <template v-slot:right>
        <q-icon name="delete" />
      </template>

      <q-item clickable v-ripple @click="showItemDetails(item)">
        <q-item-section avatar>
          <q-avatar square size="4rem">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">{{
            item.product.displayName
          }}</q-item-label>
          <q-item-label>
            <minus-plus v-model="$session.basket[index]" />
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
                <p class="q-mb-none text-bold">{{ item.product.price }} Kč</p>
                <p class="q-mb-none text-bold">x{{ item.quantity }}</p>
              </div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
    </q-slide-item>
  </q-list>

  <basket-item-details
    v-model:visible="visibleItemDetails"
    v-model:item="selectedItem"
  ></basket-item-details>
</template>

<script setup lang="ts">
import { useSessionStore } from 'stores/session';
import { BasketItem } from './models';
import BasketItemDetails from 'components/BasketItemDetails.vue';
import MinusPlus from 'components/MinusPlus.vue';
import { ref, Ref } from 'vue';
import { QSlideItem } from 'quasar';

const $session = useSessionStore();

const basketItems: Ref<QSlideItem[] | null> = ref([]);
const selectedItem: Ref<BasketItem | null> = ref(null);
const visibleItemDetails: Ref<boolean> = ref(false);

function removeItem(index: number, { reset }: { reset: () => void }) {
  reset();
  $session.basket.splice(index, 1);
}

function maxItem(index: number) {
  if (basketItems.value) {
    basketItems.value[index].reset();
  }
  $session.basket[index].quantity = $session.basket[index].product.maxQuantity;
}

function showItemDetails(item: BasketItem) {
  selectedItem.value = item;
  visibleItemDetails.value = true;
}
</script>
