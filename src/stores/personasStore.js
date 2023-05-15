import {defineStore} from "pinia"
import axios from "axios"

export const usePersonasStore= defineStore("persona", {
    state: ()=>({
      token:null,
      URL: 'http://10.202.80.188:3000/persona',
    }),

    actions:{
      getToken(data){
        this.token=data
        },
        async getPersona(){
          return await axios
					({
              method: 'get',
              url: this.URL,
              headers: 
								{
                'token' : this.token,
                }
          	})
        },

				async addPersona(data){
					await axios
					({
							method: 'post',
							url: this.URL,
							data: 
							{
								name: data.name,
    						numberIdentification: data.numberIdentification,
    						numberPhone: data.numberPhone,
    						birthDate: data.birthDate,
    						residenceAddress: data.residenceAddress,
								medicalInsuranceCompany: data.medicalInsuranceCompany,
								typeIdentification: data.typeIdentification,
							},
							headers: {
								'token' : this.token,
							}
						})
						.catch((error) => console.log(error));

				},
				async editPersona(data) {
					await axios(
						{
							method: 'put',
							url: `${this.URL}${data.id}`,
							data: {
								orderStatus: data.orderStatus,
							},
							headers: {
								'token' : this.token,
							}
						})
						// .then((res) => console.log(res))
						.catch((error) => console.log(error));
				},
				async activarPersona(props) {
					await axios(
						{
							method: 'put',
							url: `${this.URL}/${props._id}`,
							headers: {
								'token': this.$q.cookies.get('token')
							}
						})
					.then(response => console.log(response))
					.catch(error => console.log(error));
				},
		
				async desactivarPersona(props) {
					await axios(
						{
							method: 'put',
							url:`${this.URL}/${props._id}`,
							headers: {
								'token': this.$q.cookies.get('token')
							}
						})
					.then(response=> console.log(response))
					.catch(error=>console.log(error));
				}

    }
})