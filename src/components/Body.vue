<template>
  <div class="q-pa-none">
    <q-layout
      view="hHh Lpr fFf"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"
      >
        <q-toolbar class="header">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Paneleros</q-toolbar-title>

          <router-link to="/">
            <q-btn class="iboto text-left">Salir</q-btn>
          </router-link>
        </q-toolbar>
      </q-header>

      <q-drawer
        style="background-color: hsla(32, 87%, 57%, 0.61)"
        v-model="drawer"
        :width="250"
        :breakpoint="500"
        bordered
      >
        <!-- overlay -->
        <q-scroll-area class="fit bgColorEnfasis">
          <q-list>
            <router-link
              v-for="(menuItem, index) in menuList"
              :key="index"
              :to="menuItem.ruta"
              style="text-decoration: none"
            >
               <q-item
                @click="mostrarBotones(menuItem.ruta)"
                class="botones"
                clickable
                v-ripple
              >
                <q-item-section>
                  <q-row>
                    <q-col>
                      <q-icon class="icon q-m" size="20px" :name="menuItem.icon" />
                    </q-col>
                    <q-col>
                      <span class="texto">{{ menuItem.text }}</span>
                    </q-col>
                  </q-row>
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
      <q-footer elevated class="header">
        <q-toolbar>
          <q-toolbar-title>Proyecto Panelero MEAW 🔅</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>
<!-- <script >
  export default {
    beforeCreate() {
      console.log("No se ha ejecutado nada todavía");
    },
//   };
//   export default {
    data: () => ({
      info: null,
    }),
    created() {
      this.info = "Componente cargado";
    },
  };
</script> -->
<script>
import { ref } from "vue";
import { useUsuarioStore } from "../stores/menuStore";
export default {
  // created() {
  //     this.info = "Componente cargado";
  //     console.log(this.info);
  //     mostrarBotones()
  //   },
  // var URLactual = window.location;
  setup() {
    /**Cargo las variables de Pinia -> ../src/stores/usuariostore.js */
    const userStore = useUsuarioStore();

    let drawer = ref(true);

    /** Menu, que es cargado al iniciar la pagina */
    let menuList = ref(userStore.menuListHome /** Traido desde Pinia */);

    /** Cambiamos el menu según los datos que corresponden */
    function mostrarBotones(r /**string*/) {
      /**Dependiendo de la ruta del boton seleccinado cargo el respectivo menu */
      if (r == "/body/costos/homeCostos") {
        menuList.value = userStore.menuListCostos;
      } else if (r == "/body/mantenimiento/homeMantenimiento") {
        menuList.value = userStore.menuListMantenimiento;
      } else if (r == "/body/facturacion/facturacionModulos") {
        menuList.value = userStore.menuListFacturacion;
      } else if (r == "/body/home") {
        /** Este es para regresar */
        menuList.value = userStore.menuListHome;
      }
    }
    return {
      userStore,
      drawer,
      menuList,
      mostrarBotones,
    };
  },
};
</script>
  
<style  scoped>

</style>
  