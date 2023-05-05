import { defineStore } from "pinia";
import axios from "axios";

export const usePedidoStore = defineStore("pedido", {
  state: () => ({
    baseURL: axios.create({
      baseURL: 'http://localhost:3000/'
    })
  }),

  actions: {
    // axios peticiones pedidos
        
    async getPedido() {
      return await axios(
        {
          method: 'get',
          url: 'http://localhost:3000/pedidos'
        })
    },

    async addPedido(data) {
      await axios(
        {
          method: 'post',
          url: 'http://localhost:3000/pedidos',
       
          data: {
            customerName: data.customerName,
            documentType: data.documentType,
            documentNumber: data.documentNumber,
            phoneNumber: data.phoneNumber,
            email: data.email,
            descriptionOfPanela: data.descriptionOfPanela,
            preferencesOfPanela: data.preferencesOfPanela,
            orderStatus: data.orderStatus,
            quantityOfPanela: data.quantityOfPanela,
            address: data.address,
          },
          headers: {
            // 'token'
          }
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },



    // async getToken() {
    //   await axios
      
    //     .post("http://localhost:3000/pedido/login", {email:"michael@gmail.com", password:"12345678"})
    //     .then((res) => console.log(res))
    //     .catch((error) => console.log(error));
    // },
    // async putPedido(data){
    //   await axios
    //     .put("http://localhost:3000/pedido/64519566af7c88c51c149ff6", {
    //       token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pY2hhZWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY4MzA2OTA5MywiZXhwIjoxNjgzMTA1MDkzfQ.Wc3ziBcRusGeJui35QvZn8OWpcyXxiigxYhEAyzoF0o",
    //       name: data.name,
    //       email: data.email,
    //       password: data.password,
    //       // eps: data.eps,
    //       // identification: data.identification,
    //       typeUser: data.tipoPedido,
    //       // state: data.state
    //     })
    //     .then((res) => console.log(res))
    //     .catch((error) => console.log(error));
    // }

  },

});
