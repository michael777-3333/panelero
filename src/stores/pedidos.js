import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import HOST from "../stores/config.js";
let URLPEDIDOS = `${HOST}pedido/`;

export const usePedidoStore = defineStore("pedido", {
  state: () => ({
    $q: useQuasar(),
    // token: null,
  }),

  actions: {
    // axios peticiones pedido

    // getToken(tk) { this.token = tk },

    async getPedido() {
      return await axios({
        method: 'get',
        url: URLPEDIDOS,
        headers: {
          'token': this.$q.cookies.get('token'),
        }
      })
    },

    async addPedido(reqData) {
      await axios({
        method: 'post',
        url: URLPEDIDOS,
        data: reqData,
        headers: {
          'token': this.$q.cookies.get('token'),
        }
      })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async editPedido({ id, orderStatus }) {
      await axios({
        method: 'put',
        url: `${URLPEDIDOS}${id}`,
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
        url: `${URLPEDIDOS}activar/${id}`,
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
        url: `${URLPEDIDOS}desactivar/${id}`,
        headers: {
          'token': this.$q.cookies.get('token')
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

},

});
