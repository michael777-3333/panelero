import { defineStore } from "pinia";
import axios from "axios";
import { useQuasar } from 'quasar';
import HOST from "../stores/config.js";
const URLPERSONAS = `${HOST}persona/`

export const usePersonasStore = defineStore("persona", {
	state: () => ({
		$q: useQuasar(),
		//   token:null,
		//   URL: 'http://10.202.80.188:3000/persona',
	}),

	actions: {
		//   getToken(data){
		//     this.token=data
		//     },
		async getPersona() {
			return await axios({
				method: 'get',
				url: URLPERSONAS,
				headers:
				{
					'token': this.$q.cookies.get('token'),
				}
			})
		},
		async addPersona(reqData) {
			await axios({
				method: 'post',
				url: URLPERSONAS,
				data: reqData,
				// {
				// 	name: data.name,
				// 	numberIdentification: data.numberIdentification,
				// 	numberPhone: data.numberPhone,
				// 	birthDate: data.birthDate,
				// 	residenceAddress: data.residenceAddress,
				// 	medicalInsuranceCompany: data.medicalInsuranceCompany,
				// 	typeIdentification: data.typeIdentification,
				// },
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
					url: `${URLPERSONAS}${reqData.id}`,
					data: reqData,
					// {
					// 	orderStatus: data.orderStatus,
					// },
					headers: {
						'token': this.$q.cookies.get('token'),
					}
				})
				// .then((res) => console.log(res))
				.catch((error) => console.log(error));
		},
		async activarPersona(reqData) {
			await axios(
				{
					method: 'put',
					url: `${URLPERSONAS}activar/${reqData}`,
					headers: {
						'token': this.$q.cookies.get('token')
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error));
		},

		async desactivarPersona(reqData) {
			await axios(
				{
					method: 'put',
					url: `${URLPERSONAS}desactivar/${reqData}`,
					headers: {
						'token': this.$q.cookies.get('token')
					}
				})
				.then(response => console.log(response))
				.catch(error => console.log(error));
		}

	}
})