<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> {{ $settings.storeName }} </q-toolbar-title>
        <div>{{ $session.user?.displayName }}</div>
      </q-toolbar>
    </q-header>

    <q-footer v-if="$session.authenticated">
      <q-toolbar>
        <div class="row full-width">
          <div class="col-5">
            <div class="text-h5 text-no-wrap ellipsis">
              {{ $session.totalProductsTyped }} položek
            </div>
          </div>
          <div class="col-2">
            <q-btn
              square
              class="absolute-center"
              :color="$session.basket.size ? 'positive' : 'negative'"
              :icon="$session.basket.size ? 'shopping_cart' : 'logout'"
              @click="$session.basket.size ? purchaseProducts() : endSession()"
            ></q-btn>
          </div>
          <div class="col-5">
            <div class="text-h5 text-no-wrap ellipsis text-right">
              {{ $session.totalPriceTyped }} Kč
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useSettingsStore } from 'stores/settings';
import { useSessionStore } from 'stores/session';
import { inject, onMounted, onUnmounted } from 'vue';
import { EventBus, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { axios } from 'src/boot/axios';

const $q = useQuasar();
const $router = useRouter();
const $settings = useSettingsStore();
const $session = useSessionStore();
const bus = inject('bus') as EventBus;

onMounted(() => {
  bus.on('scan-failed', (): void => {
    $q.notify({
      type: 'negative',
      message: 'Nepodařilo se načíst kód',
      timeout: 500,
    });
  });
});

onUnmounted(() => {
  bus.off('scan-failed');
});

function endSession() {
  $session.$reset();
  $router.push('/login');
}

async function purchaseProducts() {
  for (const [key, value] of $session.basket) {
    for (let i = 0; i < value.priceDetails.length; i++) {
      for (let j = 0; j < value.priceDetails[i].amount; j++) {
        const result = await axios
          .post('/api/scannerOrder', {
            customer: $session.customerNumber,
            product: key,
            price: value.priceDetails[i].price,
          })
          .catch(() => {
            $q.notify({
              type: 'negative',
              message: 'Nepodařilo se zakoupit produkt',
              timeout: 1000,
            });
          });
        if (result) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          value.priceDetails[i].amount--;
          if (value.priceDetails[i].amount === 0) {
            value.priceDetails.splice(i, 1);
            // $session.basket.delete(key);
          }
          $q.notify({
            type: 'positive',
            message: `Produkt ${value.product.displayName} zakoupen za ${value.priceDetails[i].price} Kč`,
            timeout: 3000,
          });
          console.log(result);
        }
        // sleep for 2 seconds

        // .then(() => {
        //   value.priceDetails[i].amount--;
        //   if (value.priceDetails[i].amount === 0) {
        //     value.priceDetails.splice(i, 1);
        //     // $session.basket.delete(key);
        //   }
        // })
        // .catch(() => {
        //   $q.notify({
        //     type: 'negative',
        //     message: 'Nepodařilo se zakoupit produkt',
        //     timeout: 1000,
        //   });
        // });
      }
    }
    // item.product.stockSum -= item.quantity;
    $session.basket.delete(key);
  }
  endSession();
}
</script>
