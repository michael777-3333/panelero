import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import url from "../stores/config.js";

export const usePersonasStore = defineStore("persona", {
	state: () => ({
		$q: useQuasar(),
	}),

	actions: {
		async getPersona() {
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
		async addPersona(reqData) {
			await axios(
				{
					method: 'post',
					url: url.persona,
					data: reqData,
					headers: {
						'token': this.$q.cookies.get('token'),
					}
				})
				.catch((error) => console.log(error));

		},
		async editPersona(reqData) {
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
		async activarPersona(reqData) {
			await axios(
				{
					method: 'put',
					url: `${url.persona}activar/${reqData._id}`,
					headers: {
						'token': this.$q.cookies.get('token')
					}
				})
				.then(response => console.log(response))
				.catch((error) => console.log(error));

		},

		async desactivarPersona(reqData) {
			await axios(
				{
					method: 'put',
					url: `${url.persona}desactivar/${reqData._id}`,
					headers: {
						'token': this.$q.cookies.get('token')
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error));
		}

	}
})