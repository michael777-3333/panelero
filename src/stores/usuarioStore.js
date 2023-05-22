import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from "quasar";
import HOST from "../stores/config.js";
const URLUSUARIOS = `${HOST}usuario/`;

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    token: null,
    $q: useQuasar(),
    _id: null
  }),

  actions: {
    // axios peticiones usuario

    // cambiar nombre de funcion por setToken
    // getToken(data) {
    //   this.token = data
    // },

    async getUsuario() {
      return await axios(
        {
          method: 'get',
          url: `${URLUSUARIOS}`, //https://proyecto-panelera.onrender.com/usuario
          headers: {
            "token": this.$q.cookies.get('token')
          },

        })
    },

    async addUsuario(data) {
      return await axios(
        {
          method: 'post',
          url: `${HOST}auth/singup`,

          data: {
            name: data.name,
            email: data.email,
            password: data.password,
            roles: [data.roles],
          },
          headers: {
            'token': this.$q.cookies.get('token')
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },



    async login(data) {
      return await axios({
        method: 'post',
        url: `${HOST}auth/singin`,
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then((res) => res)
        .catch((error) => error);
    },

    async putUsuario(reqData) {
      await axios(
        {
          method: 'put',
          url: `${URLUSUARIOS}${reqData.id}`,

          data: reqData,
          headers: {
            'token': this.$q.cookies.get('token')
          }
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarUsuario(props) {
      await axios(
        {
          method: 'put',
          url: `${URLUSUARIOS}desactivar/${props._id}`,
          headers: {
            'token': this.$q.cookies.get('token')
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    async desactivarUsuario(props) {
      await axios(
        {
          method: 'put',
          url: `${URLUSUARIOS}activar/${props._id}`,
          headers: {
            'token': this.$q.cookies.get('token')
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

  },

});
