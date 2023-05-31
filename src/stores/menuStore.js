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
        icon: 'payments', /**request_page */
        text: 'Cotos',
        ruta: "/body/costos/costosModulos",

      },
      {
        icon: "engineering",
        text: "Mantenimiento",
        ruta: "/body/mantenimiento/usuario",
      },
      {
        icon: 'shopping_cart', /**request_page */
        text: 'Facturación',
        ruta: "/body/facturacion/pedidosModulos",
      },
      {
        icon: 'inventory', /**request_page */
        text: 'inventario',
        ruta: "/body/inventario/bodega",
      }

    ],
    /** Defino el menu de cosotos aqui! */
    menuListCostos: [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },
      // {
      //   icon: "image_not_supported",
      //   text: "Home costos",
      //   ruta: "/body/costos/homeCostos",
      // },
      {
        icon: "image_not_supported",
        text: "costo Inventario",
        ruta: "/body/costos/costosModulos",
      },
      {
        icon: "payments",
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
        icon: 'yard',
        text: 'Etapa',
        ruta: '/body/mantenimiento/etapa',
      },
      // {
      //   icon: "image_not_supported",
      //   text: "Mantenimiento",
      //   ruta: "/body/mantenimiento/homeMantenimiento",
      // },
      {
        icon: "group",
        text: "Usuarios",
        ruta: "/body/mantenimiento/usuario",
      },
      {
        icon: "travel_explore",
        text: "Lotes",
        ruta: "/body/mantenimiento/lotes",
      },
      {
        icon: "settings_accessibility",
        text: "Personas",
        ruta: "/body/mantenimiento/personas",
      },
      {
        icon: "verified",
        text: "Marcas",
        ruta: "/body/mantenimiento/marcas",
      },
      {
        icon: 'agriculture',
        text: 'Finca',
        ruta: '/body/mantenimiento/finca',
      },
    ],

    menuListFacturacion: [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },
      {
        icon: 'request_page',
        text: 'Pedidos',
        ruta: "/body/facturacion/pedidosModulos",
      },
      {
        icon: 'description', /**request_page */
        text: 'Facturación',
        ruta: "/body/facturacion/facturacionModulos",
      }
    ],
    menuListInventario: [

      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },
      // {
      //   icon: "description",
      //   text: "home",
      //   ruta: "/body/inventario/homeInventario",
      // },
      {
        icon: 'request_page',
        text: 'bodega',
        ruta: "/body/inventario/bodega",
      }
    ]
  }),

});
