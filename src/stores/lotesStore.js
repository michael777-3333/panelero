import { defineStore } from "pinia";
import axios from "axios";

export const useLoteStore = defineStore("lote", {
  state: () => ({
    token: null
  }),
  actions: {
    getToken(token) {
      this.token = token
      console.log(token, this.token)
    },

    async addLote(data) {
      await axios(
        {
          method : "post",
          url: "http://localhost:3000/lote",

          data: {
            name:data.name,
            owner: data.owner,
            size: data.size,
            createdAt: data.createdAt,
        },
        headers: {
          'token' : this.token,
        }
        })
      
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    },

    async getLote() {
      try {
        return await axios(
          {
            method: 'get',
            url: 'http://localhost:3000/lote'
          })
      } catch (error) {
        return error
      }
    },

    async putLote(data){
      await axios(
        {
          method: 'put',
          url: `http://localhost:3000/lote/${data.id}`,
       
          data: {
            owner: data.owner,
            size: data.size,
            createdAt: data.createdAt,
        },
          headers: {
            'token' : this.token,
          }
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarLote(props) {
      await axios(
        {
          method: 'put',
          url: `http://localhost:3000/lote/desactivar/${props._id}`,
          headers: {
            'token': this.token,
          }
        })
      .then(response => console.log(response))
      .catch(error => console.log(error));
    },

    async desactivarLote() {
      await axios(
        {
          method: 'put',
          url:`http://localhost:3000/lote/activar/${props._id}`,
          headers: {
            'token': this.token,
          }
        })
      .then(response=> console.log(response))
      .catch(error=>console.log(error));
    }
  },
});