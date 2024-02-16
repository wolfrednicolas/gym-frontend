import { defineStore } from 'pinia';

// import { router } from '@/router';
// import { useAlertStore } from '@/stores';

const baseUrl = `http://localhost:8080/api/admin`;

export const useCustomerStore = defineStore({
    id: 'customers',
    state: () => ({
        customer_id: {},
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
        }
    }
});
