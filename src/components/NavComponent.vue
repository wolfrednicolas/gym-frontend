<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <header class="d-flex justify-content-center py-3" >
      <ul class="nav nav-pills">
        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
        <li class="nav-item"><a href="#" class="nav-link">About</a></li>
        <li class="nav-item"><a href="#" @click="authStore.logout()" class="nav-link">Logout</a></li>
      </ul>
    </header>
</template>