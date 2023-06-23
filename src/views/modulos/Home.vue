<template>
  <!-- <div> -->
    <!-- <img src="../../assets/img/fondo.jpg" class="fondo"> -->
  <!-- </div> -->
  <div class="row" style="height: 550px;">
    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 "  @click="changeMenu('/costos')" clickable >
      <q-card class="cardHome">
        <router-link to="/costos">
          <q-img src="../../assets/img/costo.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              COSTOS
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>

    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 "  @click="changeMenu('/mantenimiento')" >
      <q-card class="cardHome">
        <router-link to="/mantenimiento/usuario">
          <q-img src="../../assets/img/mantenimiento.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              MANTENIMIENTO
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>


    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 " @click="changeMenu('/facturacion/facturacion')" clickable >
      <q-card class="cardHome">
        <router-link to="/facturacion/facturacion">
          <q-img src="../../assets/img/facturacion.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              FACTURACION
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>
    
    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 " >
      <q-card class="cardHome">
        <router-link to="/home">
          <q-img src="../../assets/img/trasformacion.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              TRANSFORMACION
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>

    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 " >
      <q-card class="cardHome">
        <router-link to="/home">
          <q-img src="../../assets/img/estadistica.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              ESTADISTICAS
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>

    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 "  @click="changeMenu('/inventario')" >
      <q-card class="cardHome">
        <router-link to="/inventario/inventario">
          <q-img src="../../assets/img/inventario.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              INVENTARIO
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>

  </div>


  <!-- <div class="q-pa-md" style="margin-top: 5%;">
    <q-linear-progress dark query color="green" class="q-mt-sm" />
    <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" />
  </div> -->
</template>

<script setup>
import { getMenu, menuListar } from '../../components/menu.js'



function changeMenu(a) {
  menuListar.value = getMenu(a)
}

</script>

<style scoped >
.cardHome {
  width: 400px;
  height: 150px;
  margin: 10px;
}

.cardHome1 {
  display: flex;
  justify-content: center;
  align-items: center;

}

.cardHome2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* @media(max-width: 590px) {
  .cardHome1 {
    display: flex;
    justify-content: end;
  }
} */
</style>  