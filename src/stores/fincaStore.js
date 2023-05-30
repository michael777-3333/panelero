import {defineStore} from "pinia";
import axios from "axios";
import { useQuasar } from "quasar"; 
import HOST from '../stores/config.js'
const URLFINCAS= `${HOST}granja/`;


export const usefincaStore = defineStore("finca", {
  state: () => ({
    $q: useQuasar(),
  }),

  actions: {
    // getToken(data) {
    //   this.token = data
    //   console.log(this.token);
    //   // console.log("token:", this.token)
  // },

    async addfinca(reqData) {
      await axios({
        method: "post",
        url: URLFINCAS,

        data: reqData,
        headers: {
          'token': this.$q.cookies.get('token'),
        }
      })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    async getfinca() {
      return await axios({
        method: 'get',
        url: URLFINCAS,
        headers: {
          'token' : this.$q.cookies.get('token'),
        }
      })
    },

    async editfinca(reqData) {
      await axios({
        method: 'put',
        url: `${URLFINCAS}${reqData.id}`,
        data: reqData,
        headers: {
          'token' : this.$q.cookies.get('token'),
        }
      })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarfinca(props) {
      await axios(
        {
          method: 'put',
          url: `${URLFINCAS}activar/${props._id}`,
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
          url: `${URLFINCAS}desactivar/${props._id}`,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  },
});