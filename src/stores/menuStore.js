import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore("menu", {
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
        text:'Cotos',
        ruta: "/body/costos/homeCostos",
        
      },
      {
        icon: "send",
        text: "Mantenimiento",
        ruta: "/body/mantenimiento/homeMantenimiento",
      },
      {
        icon: 'description', /**request_page */
        text:'Facturación',
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
        text: "Lotes",
        ruta: "/body/mantenimiento/lotes",
      },
      {
        icon: "image_not_supported",
        text: "dueños lotes",
        ruta: "/body/mantenimiento/dueñosLote",
      },
    ],
    menuListFacturacion : [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },
      {
        icon: 'request_page',
        text:'Pedidos',
        ruta: "/body/facturacion/pedidosModulos",
      },
      {
        icon: 'description', /**request_page */
        text:'Facturación',
        ruta: "/body/facturacion/facturacionModulos",
      }]
  }),

});
