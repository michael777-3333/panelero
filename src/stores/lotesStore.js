import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const useLoteStore = defineStore("lote", {
  state: () => ({ }),

  actions: {

    async addLote(reqData) {
      await instanceAxios(
        {
          method: "post",
          url: url.lote,

          data: reqData,
          headers: {
            'token': token,
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    async getLote() {
      return await instanceAxios(
        {
          method: 'get',
          url: url.lote,
          headers: {
            'token': token,
          }
        })
    },

    async editLote(reqData) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.lote}${reqData.id}`,
          data: reqData,
          headers: {
            'token': token,
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarLote(props) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.lote}activar/${props._id}`,
          headers: {
            'token': token,
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    async desactivarLote(props) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.lote}desactivar/${props._id}`,
          headers: {
            'token': token,
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  },
});