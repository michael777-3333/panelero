import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const useBodegaStore = defineStore("bodega", {
    state: () => ({
        $q: useQuasar(),
    }),
    actions: {
        async getBodega() {
            return await axios(
                {
                    method: 'get',
                    url: url.bodega,
                    headers: {
                        'token': this.$q.cookies.get('token'),
                    }
                })
        },
        async addBodega(reqData) {
            return await axios(
                {
                    method: 'post',
                    url: url.bodega,
                    data: reqData,
                    headers: {
                        'token': this.$q.cookies.get('token')
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
        async editBodega(reqData) {
            await axios(
                {
                    method: 'put',
                    url: `${url.bodega}${reqData.id}`,
                    data: reqData,
                    headers: {
                        'token': this.$q.cookies.get('token'),
                    }
                })
                .catch((error) => console.log(error));
        },
        async activarBodega(reqData) {
            await axios(
                {
                    method: 'put',
                    url: `${url.bodega}activar/${reqData._id}`,
                    headers: {
                        'token': this.$q.cookies.get('token')
                    }
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },

        async desactivarBodega(reqData) {
            await axios(
                {
                    method: 'put',
                    url: `${url.bodega}desactivar/${reqData._id}`,
                    headers: {
                        'token': this.$q.cookies.get('token')
                    }
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }

    }
})