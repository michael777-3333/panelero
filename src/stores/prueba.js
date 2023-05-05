import { defineStore } from "pinia";
import axios from "axios";
// import jwt  from 'jsonwebtoken';

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    token: null,
    // baseURL: axios.create({
    //   baseURL: 'http://localhost:3000/'
    // }),
    typeUser: null,
    _id: null
  }),

  actions: {

    async addUsuario(data) {
      await axios(
        {
          method: 'post',
          url: 'http://localhost:3000/usuario',
       
          data: { 
            name: data.name,
            email: data.email,
            password: data.password,
            typeUser: data.typeUser,
          },
          headers: {
      
          }
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async getUsuario() {
      return await axios
        .get("http://localhost:3000/usuario")
    },

    async login(data) {
      await axios({
          method: 'post',
          url: 'http://localhost:3000/usuario/login',
          data: {
            email: data.email,
            password: data.password}
          })
          .then(async(res) => { 
            this.token = res.data.token;
            // jwt.verify(this.token, 'shhhhh', function(err, decode) {
            //   if(err){
            //     console.log(err);
            //   }

            //   const { _id, typeUser } = decode;

            //   this._id = _id;
            //   this.typeUser = typeUser;

            //   console.log(this.state);
            // });
          })
          .catch((error) => console.log(error));
    },
    
    async putUsuario(data){
      await axios(
        {
          method: 'put',
          url: `http://localhost:3000/usuario/${data.id}`,
       
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
            typeUser: data.typeUser,
          },
          headers: {
            'token' : this.token,
          }
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    async activarUsuario(props) {
      await axios(
        {
          method: 'put',
          url: `http://localhost:3000/usuario/desactivar/${props._id}`,
          headers: {
            'token': this.token,
          }
        })
      .then(response => console.log(response))
      .catch(error => console.log(error));
    },

    async desactivarUsuario() {
      await axios(
        {
          method: 'put',
          url:`http://localhost:3000/usuario/activar/${props._id}`,
          headers: {
            'token': this.token,
          }
        })
      .then(response=> console.log(response))
      .catch(error=>console.log(error));
    }

  },

});
