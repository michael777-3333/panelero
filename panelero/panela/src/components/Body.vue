<template>
  <div class="q-pa-none">
    <q-layout view="hHh Lpr fFf" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar class="header">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Paneleros</q-toolbar-title>

          <router-link to="/" >
            <q-btn class="text-left">Salir</q-btn>
          </router-link>
          
        </q-toolbar>
      </q-header>

      <q-drawer 
        style="background-color: rgba(53, 53, 53, 0.171);"
        v-model="drawer"
        :width="250"
        :breakpoint="500"
        bordered
        >
        <!-- overlay -->
        <q-scroll-area class="fit">
          <q-list>
            <router-link v-for="(menuItem, index) in menuList" :key="index" :to="menuItem.ruta"  style="text-decoration: none;">
              <q-item @click="mostrarBotones()" id="app" class="botones" clickable v-ripple>
                <q-item-section avatar>
                  <q-row>
                    <q-col>
                      <q-icon class="icon"  size="20px" :name="menuItem.icon" />  
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
        <q-page padding >
          <router-view></router-view>
        </q-page>
        
      </q-page-container>
      <q-footer elevated class="header">
        <q-toolbar >
          <q-toolbar-title>Footer</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
    
  </div>
  
</template>

<script setup>
  import { ref } from 'vue'
  
  let drawer = ref(true)
  const menuList = ref([
    {
      icon: 'home',
      label: 'Inbox',
      separator: true,
      text:'Home',
      ruta: "/body/home"

    },
    {
      icon: 'send',
      label: 'Usuario',
      separator: false,
      text:'Mantenimiento',
      ruta: "/body/mantenimiento/usuario",
    },
    {
      icon: 'send',
      label: 'Costos',
      separator: false,
      text:'Costos',
      ruta: "/body/costos/costoEtapa",
      // mostrarMas: false
    },
   
  ])

  // funcion para que me despliegue las opciones de costos
  

</script>
  
<style  scoped>
 .header{
  background: linear-gradient(to right, #faa508, #ffffff);
  height:40px;
  font-family: 'Indie Flower', cursive;
 }
 .icon{
  color: #020202;
  
 }
 .texto{
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
 .botones{
  background-color: #e9ae0b9d;
  margin-bottom: 10px;
  margin :10px;
  border-radius: 20px;
 
 }

.contenedor{
  /* background-image: url(../assets/img/fondo.png); */
  background-repeat: no-repeat;
  background-size: cover;
  /* align-content: center; */
  width: 100px;

}
  
</style>
  