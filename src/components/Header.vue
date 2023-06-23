<template>
  <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
    <q-toolbar class="header-body bgColorEnfasis">
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="cajon = !cajon" />
      <q-space />
      <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
        <q-icon name="grass" color="white" size="28px" />
        <q-toolbar-title shrink class="text-weight-bold">
          PanelaSoft
        </q-toolbar-title>
      </q-btn>
      <!-- <q-toolbar-title style="font-size: 35px;">Paneleros</q-toolbar-title> -->
      <q-space />
      <q-icon name="grass" color="white" size="28px" @click="$q.dark.set(!$q.dark.isActive)" />

      <q-btn @click="userService.logoutUser()" round flat>
        <q-avatar size="26px">
          <img src="../../src/assets/img/boy-avatar.png">
        </q-avatar>
        <q-tooltip>Account</q-tooltip>
      </q-btn>

      <!-- <q-btn class="botonEditar" @click="userService.logoutUser()" label="Salir" /> -->
    </q-toolbar>
  </q-header>

  <!--  -->
  <q-drawer class="bgColorEnfasis" v-model="cajon" show-if-above bordered>
    <q-scroll-area class="fit">
      <q-list padding>
        <router-link v-for="(menuItem, index) in menuListar" :key="index" :to="menuItem.ruta" v-slot="{ isActive, href, navigate }" style="text-decoration: none" >
          <q-item @click="changeMenu(menuItem.ruta)" class="shadowMenu q-ma-sm rounded-borders" :class="isActive ? activeClass : inactiveClass" clickable v-ripple>
            <q-item-section>
              <div class="row text-left text-white">
                <div class="col-3">
                  <q-icon size="30px" :name="menuItem.icon" />
                </div>
                <div class="col-9">
                  <span class="text-h6">
                    {{ menuItem.text }}
                  </span>
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
import { useQuasar } from "quasar";
import { getMenu, menuListar, cajon, activeClass, inactiveClass } from './menu.js';
import { userService } from '../api/';

const $q = useQuasar();

function changeMenu(a) {
  menuListar.value = getMenu(a);
}

</script>
  
<style scoped>
</style>