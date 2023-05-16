import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import HOST from "../stores/config.js";
const URLLOTES = `${HOST}lote/`;

export const useLoteStore = defineStore("lote", {
  state: () => ({
    $q: useQuasar(),
  }),

  actions: {
    // getToken(data) {
    //   this.token = data
    //   console.log(this.token);
    //   // console.log("token:", this.token)
  // },

    async addLote(reqData) {
      await axios({
        method: "post",
        url: URLLOTES,

        data: reqData,
        headers: {
          'token': this.$q.cookies.get('token'),
        }
      })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    async getLote() {
      return await axios({
        method: 'get',
        url: URLLOTES,
        headers: {
          'token' : this.$q.cookies.get('token'),
        }
      })
    },

    async editLote(reqData) {
      await axios({
        method: 'put',
        url: `${URLLOTES}${reqData.id}`,
        data: reqData,
        headers: {
          'token' : this.$q.cookies.get('token'),
        }
      })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarLote(props) {
      await axios(
        {
          method: 'put',
          url: `${URLLOTES}desactivar/${props._id}`,
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
          url: `${URLLOTES}activar/${props._id}`,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  },
});