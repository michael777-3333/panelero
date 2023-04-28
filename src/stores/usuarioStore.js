import { defineStore } from "pinia";
import axios from "axios";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    // crear store para rutas
    /** Defino el menu de home aqui! */
    menuListHome: [
      {
        icon: "home",
        text: "Home",
        ruta: "/body/home",
      },
      {
        icon: 'description', /**request_page */
        text:'cotos',
        ruta: "/body/costos/homeCostos",
        
      },
      {
        icon: "send",
        text: "Mantenimiento",
        ruta: "/body/mantenimiento/homeMantenimiento",
      },
      {
        icon: 'description', /**request_page */
        text:'Facturacion',
        ruta: "/body/facturacion/facturacionModulos",
      },
      

    ],
    /** Defino el menu de cosotos aqui! */
    menuListCostos: [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },
      {
        icon: "image_not_supported",
        text: "Home costos",
        ruta: "/body/costos/homeCostos",
      },
      {
        icon: "image_not_supported",
        text: "costo Inventario",
        ruta: "/body/costos/costosModulos",
      },
      // {
      //   icon: "image_not_supported",
      //   text: "",
      //   ruta: "/body/costos/costosModulos",
      // },
      {
        icon: "image_not_supported",
        text: "Costos administrativos",
        ruta: "/body/costos/adminCostos",
      },
    ],
    /**menu lista mantenimiento */
    menuListMantenimiento: [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },
      {
        icon: "image_not_supported",
        text: "Mantenimiento",
        ruta: "/body/mantenimiento/homeMantenimiento",
      },
      {
        icon: "image_not_supported",
        text: "Usuarios",
        ruta: "/body/mantenimiento/usuario",
      },
      {
        icon: "image_not_supported",
        text: "lotes",
        ruta: "/body/mantenimiento/lotes",
      },
    ],
    menuListFacturacion : [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },
      {
        icon: 'send',
        text:'Pedidos',
        ruta: "/body/facturacion/pedidosModulos",
      },
      {
        icon: 'description', /**request_page */
        text:'Facturacion',
        ruta: "/body/facturacion/facturacionModulos",
      }]
  }),
  actions: {
    async addUsuario(data) {
      await axios
        .post("http://localhost:3000/users", {
          name: data.name,
          email: data.email,
          password: data.password,
          eps: data.eps,
          identification: data.identification,
          user_type: data.tipoUsuario
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
