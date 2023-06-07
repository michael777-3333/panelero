<template>
  <div>
    <!-- <img src="../../assets/img/fondo.jpg" class="fondo"> -->
  </div>
  <div class="row" style="height: 800px;">
    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 ">
      <q-card class="cardHome">
        <router-link to="/body/costos/adminCostos">
          <q-img src="../../assets/img/costo.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              COSTO
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>

    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 ">
      <q-card class="cardHome">
        <router-link to="/body/mantenimiento/Usuario">
          <q-img src="../../assets/img/mantenimiento.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              MANTENIMIENTO
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>


    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 ">
      <q-card class="cardHome">
        <router-link to="/body/facturacion/Pedidos">
          <q-img src="../../assets/img/facturacion.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              FACTURACION
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>
    
    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 ">
      <q-card class="cardHome">
        <router-link to="/body/inventario/Bodega">
          <q-img src="../../assets/img/trasformacion.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              TRANSFORMACION
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>

    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 ">
      <q-card class="cardHome">
        <router-link to="/body/inventario/Bodega">
          <q-img src="../../assets/img/estadistica.png">
            <div class="absolute-bottom text-subtitle2 text-center">
              ESTADISTICAS
            </div>
          </q-img>
        </router-link>
      </q-card>
    </div>

    <div class="cardHome2 col-xs-auto col-sm-6 col-lg-4 ">
      <q-card class="cardHome">
        <router-link to="/body/inventario/Bodega">
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
  
    
