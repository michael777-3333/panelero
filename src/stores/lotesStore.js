import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';

export const useLoteStore = defineStore("lote", {
  state: () => ({
    $q: useQuasar(),
    // URL: 'https://proyecto-panelera.onrender.com/lote',
    URL: "http://10.202.80.188:3000/lote"
  }),

  actions: {
    // getToken(data) {
    //   this.token = data
    //   console.log(this.token);
    //   // console.log("token:", this.token)
    // },

    async addLote(data) {
      await axios(
        {
          method : "post",
          url: `${this.URL}`,

          data: {
            // name:data.name,
            owner: data.owner,
            size: data.size,
            createdAt: data.createdAt,
        },
        headers: {
          'token': this.$q.cookies.get('token'),
        }
        })
      
      .then((res) => console.log(res))
      .catch((error) => error);
    },

    async getLote() {
      return await axios(
        {
          method: 'get',
          url: `${this.URL}`,
          headers: {
            'token' : this.$q.cookies.get('token'),
          }
        })
        .then((res) => {return res})
        .catch((error) => {return error});
    },

    async putLote(data){
      await axios(
        {
          method: 'put',
          url: `${this.URL}/${data.id}`,
      
          data: {
            owner: data.owner,
            size: data.size,
            // createdAt: data.createdAt,
        },
          headers: {
            'token' : this.$q.cookies.get('token'),
          }
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
        
    },

    async activarLote(props) {
      await axios(
        {
          method: 'put',
          url: `https://proyecto-panelera.onrender.com/lote/desactivar/${props._id}`,
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
          url:`https://proyecto-panelera.onrender.com/lote/activar/${props._id}`,
          headers: {
            'token': this.$q.cookies.get('token'),
          }
        })
      .then(response=> console.log(response))
      .catch(error=>console.log(error));
    }
  },
});