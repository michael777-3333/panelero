<template>
        <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
          <q-toolbar class="header-body bgColorEnfasis">
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title style="font-size: 35px;">Paneleros</q-toolbar-title>
            <q-btn class="text-back" style="font-size: 14px; background: #ffffff6b; color: white;" @click="goLogin()" label="Salir" />
          </q-toolbar>
        </q-header>
        
        <!-- style="background-color: hsla(32, 87%, 57%, 0.61)" -->
        <q-drawer class="bgColorEnfasis" v-model="drawer">
          <q-scroll-area class="fit">
            <q-list>
              <router-link v-for="(menuItem, index) in menuList" :key="index" :to="menuItem.ruta" style="text-decoration: none">
                <q-item glossy @click="mostrarBotones(menuItem.ruta)" class="botones-menuList" clickable v-ripple>
                  <q-item-section>
                    <div class="row text-left">
                      <div class="col-3">
                        <q-icon size="30px" :name="menuItem.icon" class="text-white" />
                      </div>
                      <div class="col-9">
                        <span class="texto-menuList">{{ menuItem.text }}</span>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </router-link>
            </q-list>
          </q-scroll-area>
        </q-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { Cookies } from 'quasar';

const router = useRouter();

const $q = useQuasar();

console.log(Cookies.get('token') || $q.cookies.get("token"));

// validar usuario login
if(!Cookies.get('token')){
  router.push('/login');
}

// router.push('/home');

function goLogin() {
  // $q.cookies.remove("token");
  Cookies.remove('token')
  router.push('/login');
//   router.replace("/");

  // router.replace({name: login});
}

let drawer = ref(false);

/** Menu, que es cargado al iniciar la pagina */
let menuList = ref([
  {
    icon: "grass",
    text: "Home",
    ruta: "/home",
  },
  
  {
    icon: 'payments',
    text: 'Costos',
    ruta: "/costos",

  },
  
  {
    icon: "engineering",
    text: "Mantenimiento",
    ruta: "/mantenimiento/usuario",
  },
  
  {
    icon: 'receipt_long', /**shopping_cart */
    text: 'Facturación',
    ruta: "/facturacion/facturacion",
  },
      
  {
    icon: 'inventory', /**request_page */
    text: 'Inventario',
    ruta: "/inventario/bodega",
  },
  
  {text: 'Reportes', ruta: '/reporte'}
]);

// alert(location.href);

/** Cambiamos el menu según los datos que corresponden */
function mostrarBotones(r /**string*/) {
  /**Dependiendo de la ruta del boton seleccionado cargo el respectivo menu */
  // if (r == "/costos/costosModulos") {
  //   menuList.value = menuStore.menuListCostos;
  // } else 
  console.log(r)
  if (r == "/mantenimiento/usuario") {
    menuList.value = [
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
        ruta: '/mantenimiento/labores',
      },
    ];
  } else if (r == "/facturacion/facturacion" ) {
    menuList.value = [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/home",
      },

      {
        icon: 'receipt_long', /**request_page */
        text: 'Facturación',
        ruta: "/facturacion/facturacion",
      },

      {
        icon: 'request_page',
        text: 'Pedidos',
        ruta: "/facturacion/pedido",
      },
    ];
  } else if (r == "/inventario/bodega") {
    menuList.value = [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/home",
      },
      {
        icon: 'storefront',
        text: 'Bodega',
        ruta: "/inventario/bodega",
      },
      {
        icon: "description",
        text: "Inventario",
        ruta: "/inventario/inventario",
      },
    ];
  } else if (r == "/home") {
    /** Este es para regresar */
    menuList.value = [
      {
        icon: "grass",
        text: "Home",
        ruta: "/home",
      },
  
    {
      icon: 'payments',
      text: 'Costos',
      ruta: "/costos",

    },
  
      {
        icon: "engineering",
        text: "Mantenimiento",
        ruta: "/mantenimiento/usuario",
      },
  
      {
        icon: 'receipt_long', /**shopping_cart */
        text: 'Facturación',
        ruta: "/facturacion/facturacion",
      },
      
      {
        icon: 'inventory', /**request_page */
        text: 'Inventario',
        ruta: "/inventario/bodega",
      },
    ];
  }
}

function mostrarBotonesUrl() {
  if (location.hash == "#/facturacion/pedido" ) {
    menuList.value = [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/home",
      },

      {
        icon: 'receipt_long', /**request_page */
        text: 'Facturación',
        ruta: "/facturacion/facturacion",
      },

      {
        icon: 'request_page',
        text: 'Pedidos',
        ruta: "/facturacion/pedido",
      },
    ];
  } else if (location.hash == "#/facturacion/facturacion" ) {
    menuList.value = [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/home",
      },

      {
        icon: 'receipt_long', /**request_page */
        text: 'Facturación',
        ruta: "/facturacion/facturacion",
      },

      {
        icon: 'request_page',
        text: 'Pedidos',
        ruta: "/facturacion/pedido",
      },
    ];
  }// else {
  //   router.push("#/facturacion/");
  // }
}

// mostrarBotonesUrl()

</script>
  
<style scoped>
.texto-menuList{
  /* font-family: Comic Sans MS; */
  font-size: 1.2rem;
  color: white;
}
</style>