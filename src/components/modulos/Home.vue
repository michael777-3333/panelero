

<!-- <script setup>
  import { beforeCreate } from 'vue';

  beforeCreate(() => {
    console.log("No se ha ejecutado nada todavía");
  });
</script> -->


<template>
  <div>
    <img src="../../assets/img/fondo.jpg" class="fondo">
  </div>

  <div class="tituloF text-center">
    <h1 class="bgColorEnfasis borderTitle text-h6">HOME</h1>
  </div>

  <div class="row justify-center items-center d-flex">

    <q-card class="homeIni my-card">

        <router-link to="costos/HomeCostos">
        <q-img src="../../assets/img/card.png">
          <div class="absolute-bottom text-h6">COSTOS</div>
        </q-img>
      </router-link>
        <!-- <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error qui
          eligendi, dolorem laudantium voluptatem delectus, ipsa id dicta
          voluptate facilis provident nihil! Fugiat illo numquam officiis
          nostrum saepe, cumque voluptas?
        </q-card-section> -->
        <q-card-section class="text-lo">
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
    </q-card>


    <q-card class="homeIni">
      <router-link to="/body/costos/adminCostos">
        <q-img src="../../assets/img/card.png">
          <div class="absolute-bottom text-h6">FACTURACIONES</div>
        </q-img>
      </router-link>
      <div>
        <q-card-section class="text-lo">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Et perferendis totam quod modi. Eligendi eos, voluptas optio
          praesentium odit ducimus ullam. Nesciunt, sapiente laboriosam. 
          Quisquam aut quos porro error non.
        </q-card-section>
      </div>
    </q-card>

    <q-card class="homeIni">
      <router-link to="/body/costos/adminCostos">
        <q-img src="../../assets/img/card.png">
          <div class="absolute-bottom text-h6">INVENTARIOS</div>
        </q-img>
      </router-link>
      <q-card-section class="text-lo">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Et perferendis totam quod modi. Eligendi eos, voluptas optio
          praesentium odit ducimus ullam. Nesciunt, sapiente laboriosam. 
          Quisquam aut quos porro error non.
        </q-card-section>
    </q-card>

    <q-card class="homeIni">
      <router-link to="mantenimiento/HomeMantenimiento">
        <q-img src="../../assets/img/card.png">
          <div class="absolute-bottom text-h6">MANTENIMIENTOS</div>
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
  
    
