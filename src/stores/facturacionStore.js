import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const useBillingStore = defineStore("pedido", {
  state: () => ({
    $q: useQuasar(),
    // token: null,
  }),

  actions: {
    async getBilling() {
      return await axios(
        {
        method: 'get',
        url: url.facturacion,
        headers: {
          'token': this.$q.cookies.get('token'),
        }
      })
    },

    async addBilling(reqData) {
      await axios(
        {
        method: 'post',
        url: url.facturacion,
        data: reqData,
        headers: {
          'token': this.$q.cookies.get('token'),
        }
      })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async editBilling({ id, orderStatus }) {
      await axios(
        {
        method: 'put',
        url: `${url.facturacion}${id}`,
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

  async enabledBilling(id) {
    await axios(
      {
        method: 'put',
        url: `${url.facturacion}activar/${id}`,
        headers: {
          'token': this.$q.cookies.get('token')
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  },

  async disabledBilling(id) {
    await axios(
      {
        method: 'put',
        url: `${url.facturacion}desactivar/${id}`,
        headers: {
          'token': this.$q.cookies.get('token')
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

},

});
