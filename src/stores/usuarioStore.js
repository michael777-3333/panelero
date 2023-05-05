import { defineStore } from "pinia";
import axios from "axios";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({token: null}),

  actions: {

    async addUsuario(data) {
      await axios
        .post("http://localhost:3000/usuario", {
          name: data.name,
          email: data.email,
          password: data.password,
          typeUser: data.typeUser
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async getUsuario() {
      return await axios
        .get("http://localhost:3000/usuario")
    },

    async login(data) {
      await axios
        .post("http://localhost:3000/usuario/login", {email: data.email, password: data.password})
          .then((res) => { this.token = res.data.token; })
          .catch((error) => console.log(error));
    },
    
    async putUsuario(data){
      await axios
        .put(`http://localhost:3000/usuario/${data.id}`, {
          token: this.token,
          name: data.name,
          email: data.email,
          password: data.password,
          typeUser: data.typeUser,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

  },

});
