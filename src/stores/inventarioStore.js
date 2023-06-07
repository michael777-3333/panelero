import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const useInventarioStore = defineStore("inventario", {
    state: () => ({ }),
  
    actions: {
  
      async addInventario(reqData) {
        await instanceAxios(
          {
            method: "post",
            url: url.inventario,
            data: reqData,
            headers: {
              'token': token,
            }
          })
          // .then((res) => console.log(res))
          .catch((error) => console.log(error));
      },
      async getInventario() {
        return await instanceAxios(
          {
            method: 'get',
            url: url.inventario,
            headers: {
              'token': token,
            }
          })
      },
  
      async editInventario(reqData) {
        await instanceAxios(
          {
            method: 'put',
            url: `${url.inventario}${reqData.id}`,
            data: reqData,
            headers: {
              'token': token,
            }
          })
          // .then((res) => console.log(res))
          .catch((error) => console.log(error));
      },
  
      async activarInventario(props) {
        await instanceAxios(
          {
            method: 'put',
            url: `${url.inventario}activar/${props._id}`,
            headers: {
              'token': token,
            }
          })
          .then(response => console.log(response))
          .catch(error => console.log(error));
      },
  
      async desactivarInventario(props) {
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