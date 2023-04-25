import { defineStore } from 'pinia'
import axios from 'axios'


export const useUsuarioStore = defineStore(
    'usuario', {
        state: () => ({
          /** Defino el menu de home aqui! */
            menuListHome : [
                {
                  icon: 'home',
                  text:'Home',
                  ruta: "/body/home"
                },
                {
                  icon: 'send',
                  text:'Mantenimiento',
                  ruta: "/body/mantenimiento/usuario",
                },
                {
                  icon: 'send',
                  text:'Costos',
                  ruta: "/body/costos/costosModulos",
                },
              ],
          /** Defino el menu de cosotos aqui! */
              menuListCostos : [
                {
                  icon: 'keyboard_backspace',
                  text:'Regresar',
                  ruta: "/body/home",
                },
                {
                  icon: 'image_not_supported',
                  text:'Modulo costos 1',
                  ruta: "/body/costos/costosModulos"
                },
                {
                  icon: 'image_not_supported',
                  text:'Modulo costos 2',
                  ruta: "/body/mantenimiento/usuario",
                },
                {
                  icon: 'image_not_supported',
                  text:'Modulo costos 3',
                  ruta: "/body/costos/costosModulos",
                },
              ]
        }),
        actions: {
            async addUsuario(data) {
                await axios.post('http://localhost:3000/api/clientes', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                })
                .then(res => console.log(res))
                .catch(error => console.log(error))
            },
            async getUsuario(){
                await axios.get('http://localhost:3000/api/clientes').then(response => console.log(response))
            }
        },
})