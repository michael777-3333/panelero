import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({ }),

  actions: {
    // instanceAxios peticiones usuario

    async getUsuario() {
      return await instanceAxios(
        {
          method: 'get',
          url: url.usuario,
          headers: {
            "token": token
          },
        })
    },

    async addUsuario(data) {
      return await instanceAxios(
        {
          method: 'post',
          url: `${url.autenticacion}singup`,

          data: {
            email: data.email,
            password: data.password,
            roles: [data.roles],
          },
          headers: {
            'token': token
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async login(data) {
      return await instanceAxios(
        {
          method: 'post',
          url: `${url.autenticacion}singin`,
          data: {
            email: data.email,
            password: data.password
          }
        })
        .then((res) => res)
        .catch((error) => error);
    },

    async putUsuario(reqData) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.usuario}${reqData.id}`,

          data: reqData,
          headers: {
            'token': token
          }
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarUsuario(props) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.usuario}desactivar/${props._id}`,
          headers: {
            'token': token
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    async desactivarUsuario(props) {
      await instanceAxios(
        {
          method: 'put',
          url: `${url.usuario}activar/${props._id}`,
          headers: {
            'token': token
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

  },

});
