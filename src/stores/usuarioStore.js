import { defineStore } from "pinia";
import axios from "axios";
// import jwt  from 'jsonwebtoken';

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    token: null,
      URL: 'http://localhost:3000/usuario',
      // URL: 'https://proyecto-panelera.onrender.com/usuario',
    typeUser: null,
    _id: null
  }),

  actions: {
    // axios peticiones usuario

    getToken(data) {
      this.token = data
    },

    async getUsuario() {
      
        try {
          return await axios(
            {
              method: 'get',
              url: `${this.URL}`, //https://proyecto-panelera.onrender.com/usuario

              headers:{
                "token":this.token
              },
               
            })
        } catch (error) {
          return error
        }
    },

    async addUsuario(data) {
      await axios(
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
            'token':this.token
          }
        })
        // .then((res) => console.log(res))
        .catch((error) => console.log(error));
    },

    

    async login(data) {
      await axios({
          method: 'post',
          url: `${this.URL}/login`,
          data: {
            email: data.email,
            password: data.password}
          })
          .then(async(res) => {
            console.log(res)
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
          url: `${this.URL}/${data.id}`,
       
          data: {
            name: data.name,
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
          url: `${this.URL}/${props._id}`,
          headers: {
            'token': this.token,
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
            'token': this.token,
          }
        })
      .then(response=> console.log(response))
      .catch(error=>console.log(error));
    }

  },

});
