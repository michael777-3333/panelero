import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from "quasar";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    token: null,
    $q: useQuasar(),
    // URL: 'http://localhost:3000/usuario',
    URL: 'http://10.202.80.188:3000/usuario',
    // URL: 'https://proyecto-panelera.onrender.com/usuario',
    typeUser: null,
    _id: null
  }),

  actions: {
    // axios peticiones usuario

    // cambiar nombre de funcion por setToken
    // getToken(data) {
    //   this.token = data
    // },

    async getUsuario() {
      
        try {
          return await axios(
            {
              method: 'get',
              url: `${this.URL}`, //https://proyecto-panelera.onrender.com/usuario

              headers:{
                "token": this.$q.cookies.get('token')
              },
               
            })
        } catch (error) {
          return error
        }
    },

    async addUsuario(data) {
      return await axios(
        {
          method: 'post',
          url: `${this.URL}`,
       
          data: { 
            name: data.name,
            email: data.email,
            password: data.password,
            typeUser: data.typeUser,
          },
          headers: {
            'token': this.$q.cookies.get('token')
          }
        })
    },

    

    async login(data) {
      return await axios({
        method: 'post',
        url: `http://10.202.80.188:3000/auth/singin`,
        data: {
          email: data.email,
          password: data.password
        }
      }) 
      .then((res) => res)
      .catch((error) => error);
    },
    
    async putUsuario(data){
      await axios(
        {
          method: 'put',
          url: `${this.URL}/${data.id}`,
       
          data: {
            name: data.name,
            password: data.password,
            typeUser: data.typeUser,
          },
          headers: {
            'token' : this.$q.cookies.get('token')
          }
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarUsuario(props) {
      await axios(
        {
          method: 'put',
          url: `${this.URL}/${props._id}`,
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
          url:`${this.URL}/${props._id}`,
          headers: {
            'token': this.$q.cookies.get('token')
          }
        })
      .then(response=> console.log(response))
      .catch(error=>console.log(error));
    }

  },

});
