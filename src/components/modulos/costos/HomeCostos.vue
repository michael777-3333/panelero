<template>
  <div>
    <img src="../../../assets/img/fondo.jpg" class="fondo">
  </div>
  <div class="tituloF text-center">
    <h1 class="bgColorEnfasis borderTitle text-h6">HOME COSTO</h1>
  </div>
  <div class="row justify-center items-center d-flex">
    <q-card class="homecosto">
      <router-link to="/body/costos/costosModulos">
        <q-img src="../../../assets/img/card.png">
          <div class="absolute-bottom text-h6">Costo Inventario</div>
        </q-img>
      </router-link>
      <q-card-section class="text-lo">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error qui
          eligendi, dolorem laudantium voluptatem delectus, ipsa id dicta
          voluptate facilis provident nihil! Fugiat illo numquam officiis
          nostrum saepe, cumque voluptas?
          <!-- {{ lorem }} -->
        </q-card-section>
    </q-card>

    <q-card class="homecosto">
      <router-link to="/body/costos/adminCostos">
        <q-img src="../../../assets/img/card.png">
          <div class="absolute-bottom text-h6">Costo Administrativo</div>
        </q-img>
      </router-link>
      <q-card-section class="text-lo">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Et perferendis totam quod modi. Eligendi eos, voluptas optio
          praesentium odit ducimus ullam. Nesciunt, sapiente laboriosam. 
          Quisquam aut quos porro error non.
        </q-card-section>
    </q-card>
  </div>

</template>

<script setup>
</script>

<style >
</style>  
  
    
