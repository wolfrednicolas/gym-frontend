<template>
    <div class="welcome container">
      <div class="notLogin" v-if="authStore.user_id == null">
        <p>Welcome</p>
        <div v-if="showLogin">
          <LoginSignUpComponent type="Login" />
          <p>not account yet? <span @click="changeView(false)"><a>SignUp</a></span></p>
        </div>
        <div v-else>
          <LoginSignUpComponent type="Sign Up"/>
          <p>Already have an account <span @click="changeView(true)"><a>Login</a></span></p>
        </div>
      </div>
    </div>
</template>


<script setup>
import {LoginSignUpComponent} from '@/components';
import { ref, onMounted, defineProps } from 'vue';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();


const props = defineProps(['showLogin'])
let showLogin = ref("true");


const changeView = (value) =>{
  showLogin.value = value; 

}
const init = () => {
  showLogin.value = props.showLogin;
};



onMounted(() => {
  init();
});

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