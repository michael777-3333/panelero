import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const useCosto = defineStore("costo", {
    state: () => ({ }),

    actions: {

        async addInvecost(reqData) {
            await instanceAxios(
                {
                    method: 'post',
                    url: url.costo,
                    data: reqData,
                    headers: {
                        'token': token
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
        async getInvecost() {
            return await instanceAxios(
                {
                    method: 'get',
                    url: url.costo,
                    headers: {
                        'token ': token,
                    }
                })
        },
        async editInvecost(reqData) {
            await instanceAxios({
                method: 'put',
                url: `${url.costo}${reqData.id}`,
                data: reqData,
                headers: {
                    'token': token,
                }
            })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
    }


});
