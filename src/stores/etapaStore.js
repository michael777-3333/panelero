import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const useEtapaStore = defineStore("etapa", {
	state: () => ({
		$q: useQuasar(),
	}),
	actions: {
		async addEtapa(reqData) {
			await axios(
			  {
				method: "post",
				url: url.etapa,
	  
				data: reqData,
				headers: {
				  'token': this.$q.cookies.get('token'),
				}
			  })
			  // .then((res) => console.log(res))
			  .catch((error) => console.log(error));
		  },
		  async getEtapa() {
			return await axios(
			  {
				method: 'get',
				url: url.etapa,
				headers: {
				  'token': this.$q.cookies.get('token'),
				}
			  })
		  },

	}
})