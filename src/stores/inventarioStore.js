import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const useInventarioStore = defineStore("inventario", {
    state: () => ({
      $q: useQuasar(),
    }),
  
    actions: {
  
      async addInventario(reqData) {
        await axios(
          {
            method: "post",
            url: url.inventario,
            data: reqData,
            headers: {
              'token': this.$q.cookies.get('token'),
            }
          })
          // .then((res) => console.log(res))
          .catch((error) => console.log(error));
      },
      async getInventario() {
        return await axios(
          {
            method: 'get',
            url: url.inventario,
            headers: {
              'token': this.$q.cookies.get('token'),
            }
          })
      },
  
      async editInventario(reqData) {
        await axios(
          {
            method: 'put',
            url: `${url.inventario}${reqData.id}`,
            data: reqData,
            headers: {
              'token': this.$q.cookies.get('token'),
            }
          })
          // .then((res) => console.log(res))
          .catch((error) => console.log(error));
      },
  
      async activarInventario(props) {
        await axios(
          {
            method: 'put',
            url: `${url.inventario}activar/${props._id}`,
            headers: {
              'token': this.$q.cookies.get('token'),
            }
          })
          .then(response => console.log(response))
          .catch(error => console.log(error));
      },
  
      async desactivarInventario(props) {
        await axios(
          {
            method: 'put',
            url: `${url.lote}desactivar/${props._id}`,
            headers: {
              'token': this.$q.cookies.get('token'),
            }
          })
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
    },
  });