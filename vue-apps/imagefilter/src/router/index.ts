import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../routerviews/HomeView.vue')
  },
  {
    path: '/bnw',
    name: 'Black & White Filter',
    component: () => import('../routerviews/BlackNWhiteFilter.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
