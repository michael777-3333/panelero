<template>
  <div class="row  justify-xs-center justify-md-start">
    <div class="col-sm-4 col-xs-10 col q-pa-lg colHome"  v-for=" (object, index) in objects" :key="index"  @click="changeMenu(object.ruta)" clickable >
      <q-card>
        <router-link :to="object.ruta">
          <q-img :src="object.srcImg">
            <div class="absolute-bottom text-subtitle2 text-center" v-text="object.name"></div>
          </q-img>
        </router-link>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { getMenu, menuListar } from '../../components/menu.js'
import { ref } from 'vue'

const objects = ref([
  { name: 'COSTOS', ruta: '/costo', srcImg: '/imgHome/costo.png' },
  { name: 'MANTENIMIENTO', ruta: '/mantenimiento/usuario', srcImg: '/imgHome/mantenimiento.png' },
  { name: 'FACTURACION', ruta: '/home', srcImg: '/imgHome/facturacion.png' },
  { name: 'TRANSFORMACION', ruta: '/home', srcImg: '/imgHome/transformacion.png' },
  { name: 'ESTADISTICA', ruta: '/home', srcImg: '/imgHome/estadistica.png'},
  { name: 'INVENTARIO', ruta: '/inventario', srcImg: '/imgHome/inventario.png' },
])

function changeMenu(ruta) {
  menuListar.value = getMenu(ruta)
}
</script>

<style scoped >
.colHome {
  width: 400px;
  height: 150px;
}
</style>  