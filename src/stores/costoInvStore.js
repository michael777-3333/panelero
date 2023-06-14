import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const useCostoInvStores = defineStore("invecost", {
    state: () => ({
        $q: useQuasar(),
    }),

    actions: {

        async addInvecost(reqData) {
            await axios(
                {
                    method: 'post',
                    url: url.invecost,
                    data: reqData,
                    headers: {
                        'token': this.$q.cookies.get('token')
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
        async getInvecost() {
            return await axios(
                {
                    method: 'get',
                    url: url.invecost,
                    headers: {
                        'token ': this.$q.cookies.get('token'),
                    }
                })
        },
        async editInvecost(reqData) {
            await axios({
                method: 'put',
                url: `${url.invecost}${reqData.id}`,
                data: reqData,
                headers: {
                    'token': this.$q.cookies.get('token'),
                }
            })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
    }


});
