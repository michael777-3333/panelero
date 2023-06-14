import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    // crear store para rutas
    /** Defino el menu de home aqui! */
    menuListHome: [
      {
        icon: "grass",
        text: "Home",
        ruta: "/body/home",
      },
      {
        icon: 'payments',
        text: 'Costos',
        ruta: "/body/costos/costosModulos",

      },
      {
        icon: "engineering",
        text: "Mantenimiento",
        ruta: "/body/mantenimiento/usuario",
      },
      {
        icon: 'receipt_long', /**shopping_cart */
        text: 'Facturación',
        ruta: "/body/facturacion/pedidos",
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
        icon: "account_balance_wallet",
        text: "Inventario",
        ruta: "/body/costos/costosModulos",
      },
      {
         icon: "paid", // payments
        text: "Administrativos",
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
        icon: 'segment', // yard
        text: 'Etapa',
        ruta: '/body/mantenimiento/etapa',
      },
      // {
      //   icon: "image_not_supported",
      //   text: "Mantenimiento",
      //   ruta: "/body/mantenimiento/homeMantenimiento",
      // },
      {
        icon: "admin_panel_settings", //group
        text: "Usuarios",
        ruta: "/body/mantenimiento/usuario",
      },
      {
        icon: "grid_view", // travel_explore
        text: "Lotes",
        ruta: "/body/mantenimiento/lotes",
      },
      {
        icon: "groups",  //settings_accessibility
        text: "Personas",
        ruta: "/body/mantenimiento/personas",
      },
      {
        icon: "new_releases", // verified
        text: "Marcas",
        ruta: "/body/mantenimiento/marcas",
      },
      {
        icon: 'gite', //agriculture
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
        ruta: "/body/facturacion/pedidos",
      },
      {
        icon: 'receipt_long', /**request_page */
        text: 'Facturación',
        ruta: "/body/facturacion/facturacion",
      }
    ],

    menuListInventario: [

      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },
      {
        icon: "description",
        text: "Inventario",
        ruta: "/body/inventario/inventario",
      },
      {
        icon: 'storefront',
        text: 'bodega',
        ruta: "/body/inventario/bodega",
      }
    ]
  }),

});
