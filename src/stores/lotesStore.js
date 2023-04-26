import { defineStore } from "pinia";
import axios from "axios";

export const useUsuarioStore = defineStore("usuario", {
    state: () => ({
      // crear store para rutas
      /** Defino el menu de home aqui! */
    }),
    actions: {
      async addLote(data) {
        await axios
          .post("http://localhost:3000/users", {
            name: data.name,
            email: data.email,
            password: data.password,
            eps: data.eps,
            identification: data.identification,
            user_type: data.tipoUsuario
          })
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      },
      async getUsuario() {
        return await axios
          .get("http://localhost:3000/users")
      },
  
  
    },
  
  });