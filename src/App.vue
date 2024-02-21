<template >
  <div v-if="authStore.role == 'USER'">
    <NavComponent />
    <AlertComponent />
    <router-view/>
  </div>
  <div v-if="authStore.role == 'ADMIN'">
    <DashboardAdminComponent />
  </div>
  <div v-if="authStore.role == null">
    <AlertComponent />
    <router-view/>
  </div>
    

</template>

<script setup>
import { NavComponent, AlertComponent } from '@/components';
import { useAuthStore } from '@/stores';
import DashboardAdminComponent from './components/DashboardAdminComponent.vue';
// import { DashboardView } from '@/views/admin/dashboard/DashboardView.vue';

const authStore = useAuthStore();

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1{
  border-bottom: 1px solid #502c2c;
  display: inline-block;
  padding-bottom: 10px;
}
</style>
