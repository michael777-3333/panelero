import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const useBillingStore = defineStore("pedido", {
  state: () => ({ }),

  actions: {
    async getBilling() {
      return await instanceAxios(
        {
        method: 'get',
        url: url.facturacion,
        headers: {
          'token': token,
        }
      })
    },

    async addBilling(reqData) {
      await instanceAxios(
        {
        method: 'post',
        url: url.facturacion,
        data: reqData,
        headers: {
          'token': token,
        }
      })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async editBilling({ id, orderStatus }) {
      await instanceAxios(
        {
        method: 'put',
        url: `${url.facturacion}${id}`,
        data: {
          orderStatus: orderStatus,
        },
        headers: {
          'token': token,
        }
      })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

  async enabledBilling(id) {
    await instanceAxios(
      {
        method: 'put',
        url: `${url.facturacion}activar/${id}`,
        headers: {
          'token': token
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  },

  async disabledBilling(id) {
    await instanceAxios(
      {
        method: 'put',
        url: `${url.facturacion}desactivar/${id}`,
        headers: {
          'token': token
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

},

});
