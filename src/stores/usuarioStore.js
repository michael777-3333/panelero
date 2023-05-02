import { defineStore } from "pinia";
import axios from "axios";

export const useUsuarioStore = defineStore("usuario", {
  actions: {
    async addUsuario(data) {
      await axios
        .post("http://localhost:3000/usuario", {
          name: data.name,
          email: data.email,
          password: data.password,
          eps: data.eps,
          identification: data.identification,
          typeUser: data.tipoUsuario,
          state: data.state
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    async getUsuario() {
      return await axios
        .get("http://localhost:3000/usuario")
    },
    async getToken() {
      await axios
      
        .post("http://localhost:3000/usuario/login", {email:"michael@gmail.com", password:"12345678"})
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },
    async putUsuario(data){
      await axios
        .put("http://localhost:3000/usuario/64519566af7c88c51c149ff6", {
          token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pY2hhZWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY4MzA2OTA5MywiZXhwIjoxNjgzMTA1MDkzfQ.Wc3ziBcRusGeJui35QvZn8OWpcyXxiigxYhEAyzoF0o",
          name: data.name,
          email: data.email,
          password: data.password,
          // eps: data.eps,
          // identification: data.identification,
          typeUser: data.tipoUsuario,
          // state: data.state
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    }


  },

});
