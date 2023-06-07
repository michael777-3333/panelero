import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const useMarcasStore = defineStore("marca", {
    state: () => ({ }),
    actions: {
        async getMarcas() {
            return await instanceAxios(
                {
                    method: 'get',
                    url: url.marca,
                    headers: {
                        'token': token,
                    }
                })
        },
        async addMarca(reqData) {
            return await instanceAxios(
                {
                    method: 'post',
                    url: url.marca,

                    data: reqData,
                    headers: {
                        'token': token
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
        async editMarca(reqData) {
            await instanceAxios(
                {
                    method: 'put',
                    url: `${url.marca}${reqData.id}`,
                    data: reqData,
                    headers: {
                        'token': token,
                    }
                })
                .catch((error) => console.log(error));
        },
        async activarMarca(reqData) {
            await instanceAxios(
                {
                    method: 'put',
                    url: `${url.marca}activar/${reqData._id}`,
                    headers: {
                        'token': token
                    }
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },

        async desactivarMarca(reqData) {
            await instanceAxios(
                {
                    method: 'put',
                    url: `${url.marca}desactivar/${reqData._id}`,
                    headers: {
                        'token': token
                    }
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }

    }
})
