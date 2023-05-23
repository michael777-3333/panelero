import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import HOST from "../stores/config.js";
const URLMARCAS =`${HOST}marca/`

export const useMarcasStore = defineStore("marca",{
    state:()=>({
        $q:useQuasar(),
    }),
    actions:{
        async getMarcas(){
            return await axios({
                method: 'get',
                url: URLMARCAS,
                headers:{
                    'token': this.$q.cookies.get('token'),
                }
            })
        },
        async addMarca(reqData) {
            return await axios(
              {
                method: 'post',
                url: URLMARCAS,
      
                data: reqData,
                headers: {
                  'token': this.$q.cookies.get('token')
                }
              })
              // .then((res) => console.log(res))
              .catch((error) => console.log(error));
          },
          async editMarca(reqData){
            await axios(
                {
                    method: 'put',
					url: `${URLMARCAS}${reqData.id}`,
					data: reqData,
					headers: {
						'token': this.$q.cookies.get('token'),
					}
                })
                .catch((error) => console.log(error));
          },
          async activarMarca(reqData) {
			await axios(
				{
					method: 'put',
					url: `${URLMARCAS}activar/${reqData._id}`,
					headers: {
						'token': this.$q.cookies.get('token')
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error));
		},

		async desactivarMarca(reqData) {
			await axios(
				{
					method: 'put',
					url: `${URLMARCAS}desactivar/${reqData._id}`,
					headers: {
						'token': this.$q.cookies.get('token')
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error));
		}

    }
})
