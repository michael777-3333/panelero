import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import HOST from "../stores/config.js";
let URLADMIN = `${HOST}CostoAdmin/`;

export const useadminCostStore = defineStore("costoadmin", {
    state: () => ({
        $q: useQuasar(),
        // token: null,
    }),

    actions: {
        // axios peticiones pedido

        // getToken(tk) { this.token = tk },
        async getCostadmin() {
            return await axios({
                method: 'get',
                url: URLADMIN,
                headers: {
                    'token ': this.$q.cookies.get('token'),
                }
            })
        },
        async addCostadmin (reqData){
            await axios({
                method: 'post',
                url: URLADMIN,
                data: reqData,
                headers: {
                    'token' : this.$q.cookies.get('token')
                }
        })
         // .then((res) => console.log(res))
         .catch((error) => console.log(error));
        },

        async editCosto({id, orderStatus}) {
           await axios({
            method: 'put',
            url: `${URLADMIN}${id}`,
            data: {
                orderStatus: orderStatus,
            } ,
            headers: {
                'token' : this.$q.cppkies.get('token'),
            }
        })
         // .then((res) => console.log(res))
         .catch((error) => console.log(error));
    },

},

});