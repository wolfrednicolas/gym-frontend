import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue';
import { useAuthStore, useAlertStore } from '@/stores';

const routes = [
  {
    path:'/',
    name:'WelcomeView',
    component: WelcomeView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' 
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();
});