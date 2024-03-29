import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue';
// import UsersView from '@/views/admin/users/UsersView';
// import DashboardChart from '@/views/admin/dashboard/DashboardChart';
import DashboardViewUser from '@/views/user/DashboardView';
import {  useAlertStore } from '@/stores';
import adminRoutes   from '@/router/admin.routes';


const routes = [
  {
    path:'/',
    name:'login',
    component: WelcomeView,
    props:{ showLogin: true }
  },
  {
    path:'/signup',
    name:'signup',
    component: WelcomeView,
    props:{ showLogin: false }
  },
  {
    path:'/users',
    name:'users',
    component: DashboardViewUser,
  },
  ...adminRoutes,
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
  console.log("donde debe ir: "+to.path)
  

  // // redirect to login page if not logged in and trying to access a restricted page 
  // const publicPages = ['/account/login', '/account/register'];
  // const authRequired = !publicPages.includes(to.path);

  // const authStore = useAuthStore();
  // authStore.returnUrl = to.fullPath

  //return authStore.returnUrl;

  // if(!authStore.user_id){
  //   return "/login"
  // }

  // if (authRequired && !authStore.user) {
  //     authStore.returnUrl = to.fullPath;
  //     return '/account/login';
  // }
});