<template>
    <div class="welcome container">
      <div class="notLogin"> <!--preguntar si esta no esta logueado-->
        <p>Welcome</p>
        <div v-if="showLogin">
            <LoginComponent />
            <p>not account yet? <span @click="showLogin = false"><a>SignUp</a></span></p>
        </div>
        <div v-else>
            <SignUpComponent/>
            <p>Already have an account <span @click="showLogin = true"><a>Login</a></span></p>
        </div>
      </div>  
    </div>
</template>

<script setup>
import LoginComponent from '@/components/LoginComponent.vue';
import SignUpComponent from '@/components/SignUpComponent.vue';
import { ref } from 'vue';

 const showLogin = ref("true");

</script>

<style>
  .welcome {
    text-align: center;
    padding: 20px 0;
  }
  /* form styles */
  .welcome form {
    width: 300px;
    margin: 20px auto;
  }
  .welcome label {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }
  .welcome span{
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  .welcome button {
    margin: 20px auto;
  }
</style>