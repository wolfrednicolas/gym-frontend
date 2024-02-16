import { defineStore } from 'pinia';

import { router } from '@/router';
import { useAlertStore } from '@/stores';

const baseUrl = `http://localhost:8080/api`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user_id: JSON.parse(localStorage.getItem('user_id')),
        role: localStorage.getItem('role'),
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
            
            this.user_id = responseJson.data.user_id;
            this.role = responseJson.data.role;
            localStorage.setItem('user_id', this.user_id);
            localStorage.setItem('role', this.role);

            if(this.role == "ADMIN"){
                router.push(this.returnUrl || '/admin');
            }else{
                router.push(this.returnUrl || '/users');
            }
            
            
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
                alertStore.error(errors);
                return;
            }

            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user_id = null;
            this.role = null;
            localStorage.removeItem('user_id');
            localStorage.removeItem('role');
            router.push('/');
        }
    }
});
