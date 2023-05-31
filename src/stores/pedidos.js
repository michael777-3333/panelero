import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const usePedidoStore = defineStore("pedido", {
  state: () => ({
    $q: useQuasar(),
  }),

  actions: {

    // getToken(tk) { this.token = tk },

    async getPedido() {
      return await axios(
        {
          method: 'get',
          url: url.pedido,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
    },

    async addPedido(reqData) {
      await axios(
        {
          method: 'post',
          url: url.pedido,
          data: reqData,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async editPedido({ id, orderStatus }) {
      await axios(
        {
          method: 'put',
          url: `${url.pedido}${id}`,
          data: {
            orderStatus: orderStatus,
          },
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async enabledOrder(id) {
      await axios(
        {
          method: 'put',
          url: `${url.pedido}activar/${id}`,
          headers: {
            'token': this.$q.cookies.get('token')
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    async disabledOrder(id) {
      await axios(
        {
          method: 'put',
          url: `${url.pedido}desactivar/${id}`,
          headers: {
            'token': this.$q.cookies.get('token')
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

  },

});
