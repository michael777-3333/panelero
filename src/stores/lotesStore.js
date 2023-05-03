import { defineStore } from "pinia";
import axios from "axios";

export const useLoteStore = defineStore("usuario", {
  state: () => ({}),
  actions: {
    async addLote(data) {
      await axios
        .post("http://localhost:3000/users", {
          name: data.name,
          email: data.email,
          password: data.password,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    },

    async getUsuario() {
      return await axios
        .get("http://localhost:3000/users")
    },
  },
});