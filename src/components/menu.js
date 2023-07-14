import { ref } from "vue";

var URLactual = window.location;
let cajon = ref(false);
let menuListar = ref('');
let activeClass = ref('bg-menuOn')
let inactiveClass = ref('')

/** Menu, que es cargado al iniciar la pagina */
const menu = {
  home: [
    {
      icon: "grass",
      text: "Home",
      ruta: "/home",
    },

    {
      icon: 'payments',
      text: 'Costos',
      ruta: "/costo",
    },

    {
      icon: "engineering",
      text: "Mantenimiento",
      ruta: "/mantenimiento/usuario",
    },

    {
      icon: 'receipt_long',
      text: 'Facturación',
      ruta: "/facturacion",
    },

    {
      icon: 'inventory',
      text: 'Inventario',
      ruta: "/inventario",
    },

    { icon: 'request_page', text: 'Reportes', ruta: '/reporte' },
  ],

  maintenance: [
    {
      icon: "keyboard_backspace",
      text: "Regresar",
      ruta: "/home",
    },
    {
      icon: "admin_panel_settings", //group
      text: "Usuarios",
      ruta: "/mantenimiento/usuario",
    },
    {
      icon: "grid_view", // travel_explore
      text: "Lotes",
      ruta: "/mantenimiento/lote",
    },
    {
      icon: "groups",  //settings_accessibility
      text: "Personas",
      ruta: "/mantenimiento/persona",
    },
    {
      icon: 'segment', // yard
      text: 'Etapa',
      ruta: '/mantenimiento/etapa',
    },
    {
      icon: "new_releases", // verified
      text: "Marcas",
      ruta: "/mantenimiento/marca",
    },
    {
      icon: 'gite', //agriculture
      text: 'Finca',
      ruta: '/mantenimiento/finca',
    },
    {
      icon: 'gite', //agriculture
      text: 'Labores',
      ruta: '/mantenimiento/labor',
    },
  ],

  billing: [
    {
      icon: "keyboard_backspace",
      text: "Regresar",
      ruta: "/home",
    },

    {
      icon: 'receipt_long', /**request_page */
      text: 'Facturación',
      ruta: "/facturacion",
    },

    {
      icon: 'request_page',
      text: 'Pedidos',
      ruta: "/facturacion/pedido",
    },
  ],

  inventory: [
    {
      icon: "keyboard_backspace",
      text: "Regresar",
      ruta: "/home",
    },
    {
      icon: "description",
      text: "Inventario",
      ruta: "/inventario",
    },
    {
      icon: 'storefront',
      text: 'Bodega',
      ruta: "/inventario/bodega",
    },
  ]
};


/** Cambiamos el menu según los datos que corresponden */
function getMenu(r = '') {
  /**Dependiendo de la ruta del boton seleccionado cargo el respectivo menu */
  if (r.includes('mantenimiento')) {
    return menu['maintenance']
  } else if (r.includes('facturacion')) {
    return menu['billing']
  } else if (r.includes('inventario')) {
    return menu['inventory']
  }
  // else  {
  /** Este es para regresar */
  return menu['home']
  // }
}
// console.log(getMenu(userService.getUrl()));
menuListar.value = getMenu(URLactual.hash)

export { getMenu, menuListar, cajon, activeClass, inactiveClass }