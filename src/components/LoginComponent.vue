<template>
    <h2>Login</h2>
    <div class = "error">{{ errors }}</div>
    <form @submit.prevent="handleSubmit">
        <input type="email" required placeholder="email" v-model="email">
        <input type="password" required placeholder="password" v-model="password">
        <button>Login</button>
    </form>

</template>

<script setup>
import { ref } from 'vue';
import Login from "@/composables/login";

const {errors, loginCallback} = Login();
        
        //refs
        const email = ref("");
        const password = ref("");

        const handleSubmit = async () =>{
            await loginCallback(email.value, password.value)
        }
</script>

<style>
</style>