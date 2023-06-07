import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";


export const usefincaStore = defineStore("finca", {
  state: () => ({ }),

  actions: {
    async addfinca(reqData) {
      await instanceAxios(
        {
          method: "post",
          url: url.finca,

          data: reqData,
          headers: {
            'token': token,
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    async getfinca() {
      return await instanceAxios(
        {
          method: 'get',
          url: url.finca,
          headers: {
            'token': token,
          }
        })
    },

    async editfinca(reqData) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.finca}${reqData.id}`,
          data: reqData,
          headers: {
            'token': token,
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarfinca(props) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.finca}activar/${props._id}`,
          headers: {
            'token': token,
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    async desactivarfinca(props) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.finca}desactivar/${props._id}`,
          headers: {
            'token': token,
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  },
});