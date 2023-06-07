import { defineStore } from "pinia";
import url, { instanceAxios, token}  from "../stores/config.js";

export const usePersonasStore = defineStore("persona", {
	state: () => ({ }),

	actions: {
		async getPersona() {
			return await instanceAxios(
				{
					method: 'get',
					url: url.persona,
					headers:
					{
						'token': token,
					}
				})
		},
		async addPersona(reqData) {
			await instanceAxios(
				{
					method: 'post',
					url: url.persona,
					data: reqData,
					headers: {
						'token': token,
					}
				})
				.catch((error) => console.log(error));

		},
		async editPersona(reqData) {
			await instanceAxios(
				{
					method: 'put',
					url: `${url.persona}${reqData.id}`,
					data: reqData,
					headers: {
						'token': token,
					}
				})
				.then(response => console.log(response))
				.catch((error) => console.log(error));
		},
		async activarPersona(reqData) {
			await instanceAxios(
				{
					method: 'put',
					url: `${url.persona}activar/${reqData._id}`,
					headers: {
						'token': token
					}
				})
				.then(response => console.log(response))
				.catch((error) => console.log(error));

		},

		async desactivarPersona(reqData) {
			await instanceAxios(
				{
					method: 'put',
					url: `${url.persona}desactivar/${reqData._id}`,
					headers: {
						'token': token
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error));
		}

	}
})