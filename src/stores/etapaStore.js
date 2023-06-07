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

	}
})