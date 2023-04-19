<template>
  <div class="q-pa">
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar class="header">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>contenedor

      <q-drawer class="lugar"
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        overlay
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        
        >
        <q-scroll-area class="fit">
          <q-list class="">

            <router-link v-for="(menuItem, index) in menuList" :key="index" :to="menuItem.ruta" >
              <q-item class="botones" clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon class="" :name="menuItem.icon" />
                  <p></p>
                </q-item-section>
                <q-item-section>
                  <!-- <router-link to="/menuItem.ruta"> -->
                    <!-- <q-btn color="black" label="login"></q-btn> -->
                  <!-- </router-link> -->
                </q-item-section>
              </q-item>
              <!-- <q-separator :key="'sep' + index" v-if="menuItem.separator"  -->
            <!-- </template> -->
            </router-link>

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
  <script setup>
  import { ref } from 'vue'
  let drawer = ref(true)
  const menuList = ref([
    {
      icon: 'inbox',
      label: 'Inbox',
      separator: true,
      ruta: "/body/home"
    },
    {
      icon: 'send',
      label: 'Outbox',
      separator: false,
      ruta: "/body/mantenimiento"
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
 }
 .botones{
  background-color: #858080;
  margin-bottom: 10px;
 }
 .lugar{
  background-color: #020202;
 }
 
  
</style>
  