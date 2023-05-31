<template>
  <div>
    <!-- <img src="../../assets/img/fondo.jpg" class="fondo"> -->
  </div>
  <div class="row">


      <div class="card1Home col-5 d-flex ">
        <q-card class="cardHome">
          <router-link to="/body/costos/adminCostos">
            <q-img src="../../assets/img/fondo.jpg">
              <div class="absolute-bottom text-subtitle2 text-center">
                COSTO
              </div>
            </q-img>
          </router-link>
        </q-card>
      </div>

      <div class="card2Home col-5">
        <q-card class="cardHome">
          <router-link to="/body/mantenimiento/Usuario">
            <q-img src="../../assets/img/fondo.jpg">
              <div class="absolute-bottom text-subtitle2 text-center">
                MANTENIMIENTO
              </div>
            </q-img>
          </router-link>
        </q-card>
      </div>


        <div class="card1Home col-5">
          <q-card class=" cardHome">
          <router-link to="/body/facturacion/PedidosModulos">
            <q-img src="../../assets/img/fondo.jpg">
              <div class="absolute-bottom text-subtitle2 text-center">
                FACTURACION
              </div>
            </q-img>
          </router-link>
        </q-card>
        </div>
        
        <div class="card2Home col-5">
          <q-card class="cardHome">
          <router-link to="/body/inventario/Bodega">
            <q-img src="../../assets/img/fondo.jpg">
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
.cardHome{
  width: 300px;
  height: 200px;
  margin: 10px;
}
.card1Home{  
  display: flex;
  justify-content: center;
  align-items: center;
}
.card2Home{
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>  
  
    
