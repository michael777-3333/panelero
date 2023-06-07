import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const useAdminCostStore = defineStore("admincost", {
    state: () => ({ }),

    actions: {
        async addAdmincost(reqData) {
            await instanceAxios(
                {
                    method: 'post',
                    url: url.admincost,
                    data: reqData,
                    headers: {
                        'token': token
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
        async getAdmincost() {
            return await instanceAxios(
                {
                    method: 'get',
                    url: url.admincost,
                    headers: {
                        'token ': token,
                    }
                })
        },
        async editAdmincost(reqData) {
            await instanceAxios(
                {
                    method: 'put',
                    url: `${url.admincost}${repData.id}`,
                    data: reqData,
                    headers: {
                        'token': token,
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },

    },

});