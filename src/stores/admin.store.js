import { defineStore } from 'pinia';

import { router } from '@/router';
import { useAlertStore } from '@/stores';

const baseUrl = `http://localhost:8080/api/admin`;

export const useAdminStore = defineStore({
    id: 'admins',
    state: () => ({
        customer: {},
        customers: {}
    }),
    actions: {
        async getAllCustomers() {
            this.customers = { loading: true };
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Bearer "+localStorage.getItem('access_token')},
              };
            const response = await fetch(baseUrl+"/customers/all", requestOptions);
            const responseText = await response.text()
            const responseJson = JSON.parse(responseText);
            this.customers = responseJson.data;
        },
        async getCustomer(id) {
            this.customer = { loading: true };
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Bearer "+localStorage.getItem('access_token')},
              };
            const response = await fetch(baseUrl+"/customers/"+id, requestOptions);
            const responseText = await response.text()
            const responseJson = JSON.parse(responseText);
            this.customer = responseJson.data;
        },
        async createClub(address, content, photoUrl, title, city, state, zipCode) {
            const body = {
                address: address,
                content: content,
                photoUrl: photoUrl,
                title: title,
                city: city,
                state: state,
                zipCode: zipCode,
            }
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Bearer "+localStorage.getItem('access_token')},
                body: JSON.stringify(body)
              };
            const alertStore = useAlertStore();
            const response = await fetch(baseUrl+"/clubs/new", requestOptions);
            if(response.status !== 201 ){
                const responseText = await response.text()
                const responseJson = JSON.parse(responseText);
                alertStore.error(responseJson.error); 
                return;
            }
            alertStore.success("Club Created"); 
            router.push(this.returnUrl || '/admin/clubs');
        }
    }
});
