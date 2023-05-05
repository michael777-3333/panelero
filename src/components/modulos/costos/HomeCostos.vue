<template>
<!-- <div>
    <img src="../../../assets/img/fondo.jpg" class="">
  </div> -->
  <div class="tituloF text-center ">
          <h1 class="bgColorEnfasis borderTitle text-h6">HOME COSTO</h1>
        </div>
  <div class="row justify-center items-center d-flex">
    <q-card class="homecosto">
        <router-link to="/body/costos/costosModulos">
      <q-img src="../../../assets/img/card.png">
        <div class="absolute-bottom text-h6">Costo Inventario</div>
      </q-img>

      <q-card-section class="text-lo">
        {{ lorem }}
      </q-card-section>
    </router-link>
    </q-card>

    <q-card class="homecosto">
      <router-link to="/body/costos/adminCostos">
      <q-img src="../../../assets/img/card.png">
        <div class="absolute-bottom text-h6">Costo Administrativo</div>
      </q-img>

      <q-card-section class="text-lo">
        {{ lorem }}
      </q-card-section>
    </router-link>

    </q-card>
  </div>

</template>

<script setup>
</script>

<style >
</style>  
  
    
