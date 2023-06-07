import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const usePedidoStore = defineStore("pedido", {
  state: () => ({ }),

  actions: {
    // getToken(tk) { this.token = tk },

    async getPedido() {
      return await instanceAxios(
        {
          method: 'get',
          url: url.pedido,
          headers: {
            'token': token,
          }
        })
    },

    async addPedido(reqData) {
      await instanceAxios(
        {
          method: 'post',
          url: url.pedido,
          data: reqData,
          headers: {
            'token': token,
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async editPedido(reqData) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.pedido}${reqData.id}`,
          data: reqData,
          headers: {
            'token': token,
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async enabledOrder(id) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.pedido}activar/${id}`,
          headers: {
            'token': token
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    async disabledOrder(id) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.pedido}desactivar/${id}`,
          headers: {
            'token': token
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

  },

});
