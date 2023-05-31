import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from "quasar";
import url from '../stores/config.js'

export const usefincaStore = defineStore("finca", {
  state: () => ({
    $q: useQuasar(),
  }),

  actions: {
    async addfinca(reqData) {
      await axios(
        {
          method: "post",
          url: url.finca,

          data: reqData,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    async getfinca() {
      return await axios(
        {
          method: 'get',
          url: url.finca,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
    },

    async editfinca(reqData) {
      await axios(
        {
          method: 'put',
          url: `${url.finca}${reqData.id}`,
          data: reqData,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarfinca(props) {
      await axios(
        {
          method: 'put',
          url: `${url.finca}activar/${props._id}`,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    async desactivarfinca(props) {
      await axios(
        {
          method: 'put',
          url: `${url.finca}desactivar/${props._id}`,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  },
});