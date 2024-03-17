<template>
  <div v-if="$session.basket.size > 0" class="full-width">
    <q-list bordered>
      <q-slide-item
        v-for="[key, value] of $session.basket"
        :key="key"
        ref="basketItems"
        @left="maxItem(key, $event)"
        @right="removeItem(key)"
        right-color="red"
      >
        <template v-slot:left>
          <q-icon name="add" />
        </template>
        <template v-slot:right>
          <q-icon name="delete" />
        </template>

        <q-item clickable v-ripple @click="showItemDetails(value)">
          <q-item-section avatar>
            <q-img :src="value.product.imagePath" fit="cover"></q-img>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{
              value.product.displayName
            }}</q-item-label>
            <q-item-label>
              <minus-plus :basketKey="key" />
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div
              readonly
              borderless
              hide-bottom-space
              class="q-mx-none text-bold"
              v-for="(stock, index) in value.priceDetails"
              :key="index"
            >
              {{ stock.amount }} x {{ stock.price }} Kč
            </div>
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>
  </div>
  <div
    v-else
    class="text-center q-pa-md flex flex-center full-width"
    style="opacity: 30%"
  >
    <div>
      <q-icon name="sym_o_remove_shopping_cart" size="8em" />
      <div class="text-h5">{{ $t('cartEmptyTitle') }}</div>
      <div class="text-subtitle1">{{ $t('cartEmptyDescription') }}</div>
    </div>
  </div>

  <basket-item-details
    v-if="visibleItemDetails"
    v-model:visible="visibleItemDetails"
    v-model:item="selectedItem"
  ></basket-item-details>
</template>

<script setup lang="ts">
import { useSessionStore } from 'stores/session';
import { BasketItemImpl } from './models';
import BasketItemDetails from 'components/BasketItemDetails.vue';
import MinusPlus from 'components/MinusPlus.vue';
import { inject, onMounted, onUnmounted, ref, Ref } from 'vue';
import { EventBus, QSlideItem } from 'quasar';
import { useQuasar } from 'quasar';
import { axios } from 'boot/axios';

const $q = useQuasar();
const $session = useSessionStore();
const bus = inject('bus') as EventBus;

const basketItems: Ref<QSlideItem[] | null> = ref([]);
const selectedItem: Ref<BasketItemImpl | null> = ref(null);
const visibleItemDetails: Ref<boolean> = ref(false);

onMounted(() => {
  bus.on('code-scanned', (value: string): void => {
    codeScanned(value);
  });
});

onUnmounted(() => {
  bus.off('code-scanned');
});

function removeItem(code: string) {
  $session.basket.delete(code);
}

function maxItem(code: string, event: { reset: () => void }) {
  const basketItem = $session.basket.get(code);
  if (basketItem) {
    basketItem.quantity = basketItem.product.stockSum;
  }
  event.reset();
}

function codeScanned(code: string) {
  $session.basket.has(code) ? increaseQuantity(code) : addProduct(code);
}

function increaseQuantity(code: string) {
  const basketItem = $session.basket.get(code);
  if (basketItem) {
    if (basketItem.quantity < basketItem.product.stockSum) {
      basketItem.quantity++;
    } else {
      $q.notify({
        type: 'negative',
        message: 'Nelze přidat více kusů',
        timeout: 1000,
      });
    }
  }
}

function addProduct(code: string) {
  axios
    .get('/api/scannerProduct?product=' + code)
    .then((product) => {
      if (product.data.stockSum === 0) {
        $q.notify({
          type: 'negative',
          message: 'Produkt není skladem',
          timeout: 1000,
        });
        return;
      }
      const item = new BasketItemImpl(product.data, 1);
      $session.basket.set(code, item);
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'Produkt nenalezen',
        timeout: 1000,
      });
    });
  // const exampleresponse = {
  //   _id: '65edd4630921c7d50bb10726',
  //   code: '123',
  //   displayName: 'Tyčinka',
  //   description: 'Mňam!',
  //   imagePath: 'https://localhost/images/kinder_country.png',
  //   category: {
  //     name: 'Sladké',
  //     color: '#391bb1',
  //   },
  //   stock: [
  //     {
  //       amount_left: 5,
  //       price: 5,
  //     },
  //     {
  //       amount_left: 5,
  //       price: 2,
  //     },
  //   ],
  //   stockSum: 10,
  // };
  // $session.basket.set(code, {
  //   product: {
  //     _id: 'string' + $session.basket.size,
  //     code: 'string',
  //     price: 105,
  //     displayName:
  //       'Monster Energy Drink 0,5l se sexy příchutí Marakváji a papagváji s trochou lásky a svěžesti Monster Energy Drink 0,5l se sexy příchutí Marakváji a papagváji s trochou lásky a svěžesti'.substring(
  //         0,
  //         7 + $session.basket.size * 10
  //       ),
  //     description:
  //       'Kvalitní osvěžení pro každého, úhledně zabalené v plechovce a to prosím bez jakýchkoliv konzervačních konzerv. Kvalitní osvěžení pro každého, úhledně zabalené v plechovce a to prosím bez jakýchkoliv konzervačních konzerv. Kvalitní osvěžení pro každého, úhledně zabalené v plechovce a to prosím bez jakýchkoliv konzervačních konzerv. Kvalitní osvěžení pro každého, úhledně zabalené v plechovce a to prosím bez jakýchkoliv konzervačních konzerv',
  //     imagePath: 'string',
  //     category: {
  //       name: 'Nápoje',
  //       color: 'primary',
  //     },
  //     maxQuantity: 3,
  //   },
  //   quantity: 1,
  // });
}

function showItemDetails(item: BasketItemImpl) {
  selectedItem.value = item;
  visibleItemDetails.value = true;
}
</script>
