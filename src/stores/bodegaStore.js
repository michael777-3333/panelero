import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import HOST from "../stores/config.js";
const URLBODEGA = `${HOST}bodega/`

export const useBodegaStore = defineStore("bodega",{
    state:()=>({
        $q:useQuasar(),
    }),
    actions:{
        async getBodega(){
            return await axios({
                method: 'get',
                url: URLBODEGA,
                headers:{
                    'token': this.$q.cookies.get('token'),
                }
            })
        },
        async addBodega(reqData) {
            return await axios(
              {
                method: 'post',
                url: URLBODEGA,
      
                data: reqData,
                headers: {
                  'token': this.$q.cookies.get('token')
                }
              })
              // .then((res) => console.log(res))
              .catch((error) => console.log(error));
          },
          async editBodega(reqData){
            await axios(
                {
                    method: 'put',
					url: `${URLBODEGA}${reqData.id}`,
					data: reqData,
					headers: {
						'token': this.$q.cookies.get('token'),
					}
                })
                .catch((error) => console.log(error));
          },
          async activarBodega(reqData) {
			await axios(
				{
					method: 'put',
					url: `${URLBODEGA}activar/${reqData._id}`,
					headers: {
						'token': this.$q.cookies.get('token')
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error));
		},

		async desactivarBodega(reqData) {
			await axios(
				{
					method: 'put',
					url: `${URLBODEGA}desactivar/${reqData._id}`,
					headers: {
						'token': this.$q.cookies.get('token')
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error));
		}

    }
})