<template>
  <div class="q-pa-none">
    <q-layout view="hHh Lpr fFf" container style="height: 100vh" class="shadow-2">
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
            <router-link v-for="(menuItem, index) in menuList" :key="index" :to="menuItem.ruta"
              style="text-decoration: none">
              <q-item @click="mostrarBotones(menuItem.ruta)" class="botones-menuList" clickable v-ripple>
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

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
      <q-footer elevated >
        <q-toolbar class="bgColorEnfasis">
          
          <q-toolbar-title>Proyecto Panelero MEAW ⚪</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";


const $q = useQuasar();

const router = useRouter();
console.log($q.cookies.get("token"));

// validar usuario login
if(!$q.cookies.get("token")){
  router.push('/');
}

// router.push('/body/home');

function goLogin() {
  $q.cookies.remove("token");
  router.replace("/");
}

let drawer = ref(false);

/** Menu, que es cargado al iniciar la pagina */
let menuList = ref([
  {
    icon: "grass",
    text: "Home",
    ruta: "/body/home",
  },
  
  // {
  //   icon: 'payments',
  //   text: 'Costos',
  //   ruta: "/body/costos/costosModulos",

  // },
  
  {
    icon: "engineering",
    text: "Mantenimiento",
    ruta: "/body/mantenimiento/usuario",
  },
  
  {
    icon: 'receipt_long', /**shopping_cart */
    text: 'Facturación',
    ruta: "/body/facturacion/pedido",
  },
      
  {
    icon: 'inventory', /**request_page */
    text: 'Inventario',
    ruta: "/body/inventario/bodega",
  },
]);

// alert(location.href);

/** Cambiamos el menu según los datos que corresponden */
function mostrarBotones(r /**string*/) {
  /**Dependiendo de la ruta del boton seleccionado cargo el respectivo menu */
  // if (r == "/body/costos/costosModulos") {
  //   menuList.value = menuStore.menuListCostos;
  // } else 
  console.log(r)
  if (r == "/body/mantenimiento/usuario") {
    menuList.value = [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },

      {
        icon: "admin_panel_settings", //group
        text: "Usuarios",
        ruta: "/body/mantenimiento/usuario",
      },

      
      {
        icon: "grid_view", // travel_explore
        text: "Lotes",
        ruta: "/body/mantenimiento/lote",
      },

      {
        icon: "groups",  //settings_accessibility
        text: "Personas",
        ruta: "/body/mantenimiento/persona",
      },

      {
        icon: 'segment', // yard
        text: 'Etapa',
        ruta: '/body/mantenimiento/etapa',
      },

      {
        icon: "new_releases", // verified
        text: "Marcas",
        ruta: "/body/mantenimiento/marca",
      },

      {
        icon: 'gite', //agriculture
        text: 'Finca',
        ruta: '/body/mantenimiento/finca',
      },
    ];
  } else if (r == "/body/facturacion/facturacion" ) {
    menuList.value = [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },

      {
        icon: 'receipt_long', /**request_page */
        text: 'Facturación',
        ruta: "/body/facturacion/facturacion",
      },

      {
        icon: 'request_page',
        text: 'Pedidos',
        ruta: "/body/facturacion/pedido",
      },
    ];
  } else if (r == "/body/inventario/bodega") {
    menuList.value = [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },
      

      {
        icon: 'storefront',
        text: 'Bodega',
        ruta: "/body/inventario/bodega",
      },

      {
        icon: "description",
        text: "Inventario",
        ruta: "/body/inventario/inventario",
      },
    ];
  } else if (r == "/body/home") {
    /** Este es para regresar */
    menuList.value = [
      {
        icon: "grass",
        text: "Home",
        ruta: "/body/home",
      },
  
    // {
    //   icon: 'payments',
    //   text: 'Costos',
    //   ruta: "/body/costos/costosModulos",

    // },
  
      {
        icon: "engineering",
        text: "Mantenimiento",
        ruta: "/body/mantenimiento/usuario",
      },
  
      {
        icon: 'receipt_long', /**shopping_cart */
        text: 'Facturación',
        ruta: "/body/facturacion/facturacion",
      },
      
      {
        icon: 'inventory', /**request_page */
        text: 'Inventario',
        ruta: "/body/inventario/bodega",
      },
    ];
  }
}

function mostrarBotonesUrl() {
  if (location.hash == "#/body/facturacion/pedido" ) {
    menuList.value = [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },

      {
        icon: 'receipt_long', /**request_page */
        text: 'Facturación',
        ruta: "/body/facturacion/facturacion",
      },

      {
        icon: 'request_page',
        text: 'Pedidos',
        ruta: "/body/facturacion/pedido",
      },
    ];
  } else if (location.hash == "#/body/facturacion/facturacion" ) {
    menuList.value = [
      {
        icon: "keyboard_backspace",
        text: "Regresar",
        ruta: "/body/home",
      },

      {
        icon: 'receipt_long', /**request_page */
        text: 'Facturación',
        ruta: "/body/facturacion/facturacion",
      },

      {
        icon: 'request_page',
        text: 'Pedidos',
        ruta: "/body/facturacion/pedido",
      },
    ];
  }// else {
  //   router.push("#/body/facturacion/");
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