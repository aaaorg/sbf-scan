<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title> {{ $settings.storeName }} </q-toolbar-title>

        <div>{{ $session.user?.displayName }}</div>
      </q-toolbar>
    </q-header>

    <q-footer v-if="$session.authenticated">
      <q-toolbar>
        <div class="row full-width">
          <div class="col-5">
            <div class="text-h5 text-no-wrap ellipsis">
              {{ $session.totalProducts }} položek
            </div>
          </div>
          <div class="col-2">
            <q-btn
              square
              class="absolute-center"
              :color="$session.basket.length ? 'positive' : 'negative'"
              :icon="$session.basket.length ? 'shopping_cart' : 'logout'"
              @click="addProductDebug"
            ></q-btn>
          </div>
          <div class="col-5">
            <div class="text-h5 text-no-wrap ellipsis text-right">
              {{ $session.totalPrice }} Kč
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
import { inject, onMounted } from 'vue';
import { EventBus } from 'quasar';
import ScanInput from 'components/ScanInput.vue';

const $settings = useSettingsStore();
const $session = useSessionStore();
const bus = inject('bus') as EventBus;

onMounted(() => {
  console.log('MainLayout onMounted');
  bus.on('scan-input', (value: string): void => {
    console.log('scan-input', value);
  });
});

function addProductDebug() {
  $session.basket.push({
    product: {
      id: 'string' + $session.basket.length,
      ean: 'string',
      price: 105,
      displayName:
        'Monster Energy Drink 0,5l se sexy příchutí Marakváji a papagváji s trochou lásky a svěžesti Monster Energy Drink 0,5l se sexy příchutí Marakváji a papagváji s trochou lásky a svěžesti'.substring(
          0,
          7 + $session.basket.length * 10
        ),
      description:
        'Kvalitní osvěžení pro každého, úhledně zabalené v plechovce a to prosím bez jakýchkoliv konzervačních konzerv. Kvalitní osvěžení pro každého, úhledně zabalené v plechovce a to prosím bez jakýchkoliv konzervačních konzerv. Kvalitní osvěžení pro každého, úhledně zabalené v plechovce a to prosím bez jakýchkoliv konzervačních konzerv. Kvalitní osvěžení pro každého, úhledně zabalené v plechovce a to prosím bez jakýchkoliv konzervačních konzerv',
      imagePath: 'string',
      category: {
        name: 'Nápoje',
        color: 'primary',
      },
      maxQuantity: 3,
    },
    quantity: 1,
  });
}
</script>
