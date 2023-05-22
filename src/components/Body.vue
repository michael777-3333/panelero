<template>
  <div class="q-pa-none">
    <q-layout
      view="hHh Lpr fFf" container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"
      >
        <q-toolbar class="header-body">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Paneleros</q-toolbar-title>
          <q-btn class="text-back" @click="goLogin()" label="Salir" />
        </q-toolbar>
      </q-header>

      <q-drawer
        style="background-color: hsla(32, 87%, 57%, 0.61)"
        v-model="drawer"
        show-if-above
        :width="250"
        :breakpoint="500"
       
      >
        <!-- overlay -->
        <q-scroll-area class="fit color-principal">
          <q-list>
            <router-link
              v-for="(menuItem, index) in menuList"
              :key="index"
              :to="menuItem.ruta"
              style="text-decoration: none"
            >
              <q-item
                @click="mostrarBotones(menuItem.ruta)"
                class="botones-menuList"
                clickable v-ripple>
                <q-item-section>
                  <div class="row text-left">
                    <div class="col-3">
                      <q-icon size="30px" :name="menuItem.icon" />
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
      <q-footer elevated class="header-body">
        <q-toolbar>
          <q-toolbar-title>Proyecto Panelero MEAW 🔅</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMenuStore } from "../stores/menuStore.js";
import { useUsuarioStore } from "../stores/usuarioStore.js";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";


const $q = useQuasar();

const menuStore = useMenuStore();

const store = useUsuarioStore();

const router = useRouter();

console.log($q.cookies.get("token"));

function goLogin() {
  $q.cookies.remove("token");

  router.push("/");
}

let drawer = ref(false);



/** Menu, que es cargado al iniciar la pagina */
let menuList = ref(menuStore.menuListHome); /** Traido desde Pinia */

/** Cambiamos el menu según los datos que corresponden */
function mostrarBotones(r /**string*/) {
  /**Dependiendo de la ruta del boton seleccinado cargo el respectivo menu */
  if (r == "/body/costos/homeCostos") {
    menuList.value = menuStore.menuListCostos;
  } else if (r == "/body/mantenimiento/homeMantenimiento") {
    menuList.value = menuStore.menuListMantenimiento;
  } else if (r == "/body/facturacion/facturacionModulos") {
    menuList.value = menuStore.menuListFacturacion;
  } else if (r == "/body/home") {
    /** Este es para regresar */
    menuList.value = menuStore.menuListHome;
  }
 
}

</script>
  
<style scoped>
</style>