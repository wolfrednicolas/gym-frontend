import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue';

const routes = [
  {
    path:'/',
    name:'WelcomeView',
    component: WelcomeView
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
