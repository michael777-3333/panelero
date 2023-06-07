import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const useBodegaStore = defineStore("bodega", {
    state: () => ({ }),
    actions: {
        async getBodega() {
            return await instanceAxios(
                {
                    method: 'get',
                    url: url.bodega,
                    headers: {
                        'token': token,
                    }
                })
        },
        async addBodega(reqData) {
            return await instanceAxios(
                {
                    method: 'post',
                    url: url.bodega,
                    data: reqData,
                    headers: {
                        'token': token
                    }
                })
                // .then((res) => console.log(res))
                .catch((error) => console.log(error));
        },
        async editBodega(reqData) {
            await instanceAxios(
                {
                    method: 'put',
                    url: `${url.bodega}${reqData.id}`,
                    data: reqData,
                    headers: {
                        'token': token,
                    }
                })
                .catch((error) => console.log(error));
        },
        async activarBodega(reqData) {
            await instanceAxios(
                {
                    method: 'put',
                    url: `${url.bodega}activar/${reqData._id}`,
                    headers: {
                        'token': token
                    }
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },

        async desactivarBodega(reqData) {
            await instanceAxios(
                {
                    method: 'put',
                    url: `${url.bodega}desactivar/${reqData._id}`,
                    headers: {
                        'token': token
                    }
                })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }

    }
})