<template>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
        <input type="email" required placeholder="email" v-model="email">
        <input type="password" required placeholder="password" v-model="password">
        <button>Login</button>
    </form>

</template>

<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores';
        
    //refs
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () =>{
        const authStore = useAuthStore();
        await authStore.login(email, password);
    }
</script>

<style>
</style>