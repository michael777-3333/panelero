import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const useLoteStore = defineStore("lote", {
  state: () => ({
    $q: useQuasar(),
  }),

  actions: {

    async addLote(reqData) {
      await axios(
        {
          method: "post",
          url: url.lote,

          data: reqData,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    async getLote() {
      return await axios(
        {
          method: 'get',
          url: url.lote,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
    },

    async editLote(reqData) {
      await axios(
        {
          method: 'put',
          url: `${url.lote}${reqData.id}`,
          data: reqData,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarLote(props) {
      await axios(
        {
          method: 'put',
          url: `${url.lote}activar/${props._id}`,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    async desactivarLote(props) {
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