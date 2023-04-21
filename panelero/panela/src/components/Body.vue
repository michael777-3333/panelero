<template>
  <div class="q-pa">
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar class="header">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>
      <!-- contenedor -->

      <q-drawer 
      style="background-color: rgba(53, 53, 53, 0.171);"
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        overlay
        bordered

        
        >
        <q-scroll-area class="fit">
          <q-list class="">

            <router-link v-for="(menuItem, index) in menuList" :key="index" :to="menuItem.ruta"  style="text-decoration: none;">
              <q-item class="botones" clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-row>
                    <q-col>
                      <q-icon class="icon"  size="30px" style=";"  :name="menuItem.icon" />
                      
                    </q-col>
                    <q-col > 
                      <span class="texto">home</span>
                    </q-col>
                    
                  </q-row>
                                   
                </q-item-section>
                <q-item-section>
                </q-item-section>
              </q-item>
            </router-link>

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="contenedor">
        <q-page padding >
          <router-view></router-view>
        </q-page>
        
      </q-page-container>
      <q-footer elevated class="footer">
        <q-toolbar class="glossy">
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

      ruta: "/body/home"
    },
    {
      icon: 'send',
      label: 'Mantenimiento/Usuario',
      separator: false,
      ruta: "/body/mantenimiento/usuario"
    },
    // {
    //   icon: 'delete',
    //   label: 'Trash',
    //   separator: false,
    //   ruta: "/login"
    // },
    // {
    //   icon: 'error',
    //   label: 'Spam',
    //   separator: true,
    //   ruta: "/login"
    // },
    // {
    //   icon: 'settings',
    //   label: 'Settings',
    //   separator: false,
    //   ruta: "/login"
    // },
    // {
    //   icon: 'feedback',
    //   label: 'Send Feedback',
    //   separator: false,
    //   ruta: "/login"
    // },
    // {
    //   icon: 'help',
    //   iconColor: 'primary',
    //   label: 'Help',
    //   separator: false,
    //   ruta: "/login"

    // }
  ])
  
  // export default {
  //   setup () {
  //     return {
  //       drawer: ref(true),
  //       menuList
  //     }
  //   }
  // }
</script>
  
<style  scoped>
 .header{
  background: linear-gradient(to right, #020202, #ffffff);
  height:80px;
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
 .footer{
  background: linear-gradient(to right, #020202, #ffffff);
  font-family: 'Indie Flower', cursive;
 }
 .botones{
  background-color: #5c57579d;
  margin-bottom: 10px;
  margin :10px;
  border-radius: 20px;
 
 }

.ludafsgfdg{
  background-color: rgba(53, 53, 53, 0.671);

}
.contenedor{
  background-image: url(../assets/img/fondo.png);
  /* background-repeat: no-repeat; */
  /* background-size: cover; */
  
 

}
  
</style>
  