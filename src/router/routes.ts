import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true }  },
      { path: 'login', component: () => import('pages/AuthenticatePage.vue')},
    ],
    meta: { requiresConf: true },
  },
  {
    path: '/initialize',
    component: () => import('layouts/InitializeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/InitializePage.vue') },
    ],
    meta: { requiresNew: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
