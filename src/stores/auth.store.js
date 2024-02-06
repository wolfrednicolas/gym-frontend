import { defineStore } from 'pinia';

import { router } from '@/router';
import { useAlertStore } from '@/stores';

//const baseUrl = `http://localhost:8080/api`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            const body = {
                email: email.value, password: password.value
            }
            console.log(body)
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json"},
                body: JSON.stringify(body)
              };
            // const response = await fetch(baseUrl+"/login", requestOptions);
            const response = await fetch("http://localhost:8080/api/login", requestOptions);
            console.log(response)
            const responseText = await response.text()
            const responseJson = JSON.parse(responseText);
            console.log(responseJson);
            if(response.status !== 200 ){
                const alertStore = useAlertStore();
                alertStore.error(responseJson.error); 
                return;
            }

            localStorage.setItem('user_id', responseJson.data.user_id);
            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user_id');
            router.push('/');
        }
    }
});
