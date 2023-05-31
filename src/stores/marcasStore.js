import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const useMarcasStore = defineStore("marca", {
    state: () => ({
        $q: useQuasar(),
    }),
    actions: {
        async getMarcas() {
            return await axios(
                {
                    method: 'get',
                    url: url.marca,
                    headers: {
                        'token': this.$q.cookies.get('token'),
                    }
                })
        },
        async addMarca(reqData) {
            return await axios(
                {
                    method: 'post',
                    url: url.marca,

                    data: reqData,
                    headers: {
                        'token': this.$q.cookies.get('token')
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
        async editMarca(reqData) {
            await axios(
                {
                    method: 'put',
                    url: `${url.marca}${reqData.id}`,
                    data: reqData,
                    headers: {
                        'token': this.$q.cookies.get('token'),
                    }
                })
                .catch((error) => console.log(error));
        },
        async activarMarca(reqData) {
            await axios(
                {
                    method: 'put',
                    url: `${url.marca}activar/${reqData._id}`,
                    headers: {
                        'token': this.$q.cookies.get('token')
                    }
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },

        async desactivarMarca(reqData) {
            await axios(
                {
                    method: 'put',
                    url: `${url.marca}desactivar/${reqData._id}`,
                    headers: {
                        'token': this.$q.cookies.get('token')
                    }
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }

    }
})
