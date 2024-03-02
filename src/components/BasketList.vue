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

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white" size="4rem">
            {{ item.product.displayName }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.product.displayName }}</q-item-label>
          <!-- <q-item-label caption lines="1">{{ item.count }}</q-item-label> -->
          <q-item-label>
            <q-btn
              round
              color="primary"
              icon="remove"
              @click="decreaseQuantity(index)"
              @click.stop
              @keypress.stop
            />
            <q-btn
              round
              color="primary"
              icon="add"
              class="q-mx-md"
              :disable="item.quantity >= item.product.maxQuantity"
              @click="increaseQuantity(item)"
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
                {{ item.product.price }} Kč <br />
                x{{ item.quantity }}
              </div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
    </q-slide-item>
  </q-list>
</template>

<script setup lang="ts">
import { useSessionStore } from 'stores/session';
import { BasketItem } from 'components/models';
import { ref, Ref } from 'vue';
import { QSlideItem } from 'quasar';

const $session = useSessionStore();

const basketItems: Ref<QSlideItem[] | null> = ref([]);

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

function increaseQuantity(item: BasketItem) {
  item.quantity++;
}

function decreaseQuantity(index: number) {
  $session.basket[index].quantity--;
  if ($session.basket[index].quantity <= 0) {
    $session.basket.splice(index, 1);
  }
}
</script>
