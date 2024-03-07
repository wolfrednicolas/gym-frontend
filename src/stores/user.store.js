import { defineStore } from 'pinia';

// import { router } from '@/router';
// import { useAlertStore } from '@/stores';

const baseUrl = `http://localhost:8080/api`;

export const useUserStore = defineStore({
    id: 'users',
    state: () => ({
        club: {},
        clubs: {}
    }),
    actions: {
        async getAllClubs() {
            this.clubs = { loading: true };
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Bearer "+localStorage.getItem('access_token')},
              };
            const response = await fetch(baseUrl+"/clubs/all", requestOptions);
            const responseText = await response.text()
            const responseJson = JSON.parse(responseText);
            this.clubs = responseJson.data;
        },
        async getClub(id) {
            this.customer = { loading: true };
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Bearer "+localStorage.getItem('access_token')},
              };
            const response = await fetch(baseUrl+"/clubs/"+id, requestOptions);
            const responseText = await response.text()
            const responseJson = JSON.parse(responseText);
            this.club = responseJson.data;
        }
    }
});
