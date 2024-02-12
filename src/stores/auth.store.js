import { defineStore } from 'pinia';

import { router } from '@/router';
import { useAlertStore } from '@/stores';

const baseUrl = `http://localhost:8080/api`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user_id: JSON.parse(localStorage.getItem('user_id')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            const body = {
                email: email, password: password
            }
            console.log(body)
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json"},
                body: JSON.stringify(body)
              };
            const response = await fetch(baseUrl+"/login", requestOptions);
            const responseText = await response.text()
            const responseJson = JSON.parse(responseText);
            if(response.status !== 200 ){
                const alertStore = useAlertStore();
                alertStore.error(responseJson.error); 
                return;
            }
            localStorage.setItem('user_id', responseJson.data.user_id);
            localStorage.setItem('role', responseJson.data.role);
            router.push(this.returnUrl || '/');
        },
        async signUp(email, password, role) {

            if(!role){
                role = "USER";
            }
            const body = {
                email: email, password: password, role: role
            }
            console.log(body)
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json"},
                body: JSON.stringify(body)
              };
            const response = await fetch(baseUrl+"/signup", requestOptions);

            const responseText = await response.text()
            const responseJson = JSON.parse(responseText);
            if(response.status !== 201 ){
                const alertStore = useAlertStore();
                let errors = responseJson.error != null ? responseJson.error: responseJson.errors
                return;
            }

            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user_id');
            router.push('/');
        }
    }
});
