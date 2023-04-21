import { defineStore } from 'pinia'
import axios from 'axios'


export const useUsuarioStore = defineStore('usuario', {
    state: () => ({}),
    actions: {
        async addUsuario(data) {
            await axios.post('http://localhost:3000/api/clientes', {
                name: data.name,
                email: data.email,
                password: data.password,
            })
            .then(res => console.log(res))
            .catch(error => console.log(error))
        }
    },
})