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
          <div class="col">
            <div class="text-h5 text-no-wrap">
              {{ $session.totalProducts }} položek
            </div>
          </div>
          <div class="col full-width">
            <q-btn
              class="absolute-center"
              color="negative"
              @click="addProductDebug"
              >{{ $session.authenticated ? 'TRUE' : 'FALSE' }}</q-btn
            >
          </div>
          <div class="col v">
            <div class="text-h5 text-no-wrap text-right">
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

const $settings = useSettingsStore();
const $session = useSessionStore();

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
