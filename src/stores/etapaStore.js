import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const useEtapaStore = defineStore("etapa", {
	state: () => ({ }),
	actions: {
		async addEtapa(reqData) {
			await instanceAxios(
			  {
				method: "post",
				url: url.etapa,
	  
				data: reqData,
				headers: {
				  'token': token,
				}
			  })
			  // .then((res) => console.log(res))
			  .catch((error) => console.log(error));
		  },
		  async getEtapa() {
			return await instanceAxios(
			  {
				method: 'get',
				url: url.etapa,
				headers: {
				  'token': token,
				}
			  })
		  },
		  async editEtapa(reqData) {
			await instanceAxios(
			  {
				method: 'put',
				url: `${url.etapa}${reqData.id}`,
				data: reqData,
				headers: {
				  'token': token,
				}
			  })
			  // .then((res) => console.log(res))
			  .catch((error) => console.log(error));
		  },
	  
		  async activarEtapa(props) {
			await instanceAxios(
			  {
				method: 'put',
				url: `${url.etapa}activar/${props._id}`,
				headers: {
				  'token': token,
				}
			  })
			  .then(response => console.log(response))
			  .catch(error => console.log(error));
		  },
	  
		  async desactivarEtapa(props) {
			await instanceAxios(
			  {
				method: 'put',
				url: `${url.etapa}desactivar/${props._id}`,
				headers: {
				  'token': token,
				}
			  })
			  .then(response => console.log(response))
			  .catch(error => console.log(error));
		  }

	}
})