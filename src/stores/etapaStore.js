import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const useEtapaStore = defineStore("etapa", {
	state: () => ({
		$q: useQuasar(),
	}),
	actions: {
		async getPersonaEtapa() {
			return await axios(
				{
					method: 'get',
					url: url.persona,
					headers:
					{
						'token': this.$q.cookies.get('token'),
					}
				})
		},

		async editPersonaEtapa(reqData) {
			await axios(
				{
					method: 'put',
					url: `${url.persona}${reqData.id}`,
					data: reqData,
					headers: {
						'token': this.$q.cookies.get('token'),
					}
				})
				.then(response => console.log(response))
				.catch((error) => console.log(error));
		},
	}
})