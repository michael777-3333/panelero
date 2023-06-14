import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const useAdminCostStore = defineStore("admincost", {
    state: () => ({
        $q: useQuasar(),
    }),

    actions: {
        async addAdmincost(reqData) {
            await axios(
                {
                    method: 'post',
                    url: url.admincost,
                    data: reqData,
                    headers: {
                        'token': this.$q.cookies.get('token')
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
        async getAdmincost() {
            return await axios(
                {
                    method: 'get',
                    url: url.admincost,
                    headers: {
                        'token ': this.$q.cookies.get('token'),
                    }
                })
        },
        async editAdmincost(reqData) {
            await axios(
                {
                    method: 'put',
                    url: `${url.admincost}${repData.id}`,
                    data: reqData,
                    headers: {
                        'token': this.$q.cookies.get('token'),
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },

    },

});