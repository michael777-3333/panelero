<template>
  <div class="q-pa-none">
    <q-layout view="hHh Lpr fFf" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar class="header">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Paneleros</q-toolbar-title>

          <router-link to="/">
            <q-btn class="text-left">Salir</q-btn>
          </router-link>

        </q-toolbar>
      </q-header>

      <q-drawer style="background-color:hsla(32, 87%, 57%, 0.61);" v-model="drawer" :width="250" :breakpoint="500"
        bordered>
        <!-- overlay -->
        <q-scroll-area class="fit">
          <q-list>
            <router-link v-for="(menuItem, index) in menuList" :key="index" :to="menuItem.ruta"
              style="text-decoration: none;">
              <!-- Aqui le paso menuItem.ruta a la funcion mostrar   botones -->
              <q-item @click="mostrarBotones(menuItem.ruta)" class="botones" clickable v-ripple>
                <q-item-section avatar>
                  <q-row>
                    <q-col>
                      <q-icon class="icon" size="20px" :name="menuItem.icon" />
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
          <q-toolbar-title>Footer</q-toolbar-title>
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
import { ref } from 'vue'
import { useUsuarioStore } from "../stores/usuarioStore"
export default {
  // created() {
  //     this.info = "Componente cargado";
  //     console.log(this.info);
  //     mostrarBotones()
  //   },
  // var URLactual = window.location;
  setup() {
    /**Cargo las variables de Pinia -> ../src/stores/usuariostore.js */
    const userStore = useUsuarioStore()
    
    let drawer = ref(true)

    /** Menu, que es cargado al iniciar la pagina */
    let menuList = ref(userStore.menuListHome /** Traido desde Pinia */)

    /** Cambiamos el menu según los datos que corresponden */
    function mostrarBotones(r/**string*/) {
      /**Dependiendo de la ruta del boton seleciinado cargo el respectivo menu */
      if (r == "/body/costos/costosModulos") {
        menuList.value = userStore.menuListCostos
      } else if (r == "/body/home"){
        /**Este es para regresar */
        menuList.value = userStore.menuListHome
      }

    }
    return {
      userStore, drawer, menuList, mostrarBotones
    }
  },
    // data: () => ({
    //   info: null,
    //   // mostrarBotones
    // }),
    // created() {
    //   this.info = "Componente cargado";
    //   console.log(this.info);
    //   // mostrarBotones()
    // },
}



</script>
  
<style  scoped>
.header {
  background: linear-gradient(to right, #F39A31, #F39A31);
  height: 40px;
  font-family: 'Indie Flower', cursive;
}

.icon {
  color: #020202;

}

.texto {
  text-align: center;
  color: #020202;
  margin: 20px;
  font-size: 20px;
  font-family: 'Indie Flower', cursive;
}

/* .footer{
  background: linear-gradient(to right, #faa508, #ffffff);
  font-family: 'Indie Flower', cursive;
 } */
.botones {
  background-color: #F8EDE2;
  margin-bottom: 10px;
  margin: 10px;
  border-radius: 20px;

}

.contenedor {
  /* background-image: url(../assets/img/fondo.png); */
  background-repeat: no-repeat;
  background-size: cover;
  /* align-content: center; */
  width: 100px;

}

.fdff {
  background-color: hsla(32, 87%, 57%, 0.61);
}
</style>
  