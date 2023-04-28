
<template>
  <div>
    <img src="../../../assets/img/fondo1.jpg" class="img1">
  </div>
  <div class="tituloF text-center ">
          <h1 class="bgColorEnfasis borderTitle text-h6">HOME COSTO</h1>
        </div>
  <div class="row justify-center items-center d-flex">
    <q-card class="homecosto">
      <q-img src="../../../assets/img/fondoPanela.jpg">
        <div class="absolute-bottom text-h6">Costo Inventario</div>
      </q-img>

      <q-card-section class="text-lo">
        {{ lorem }}
      </q-card-section>
    </q-card>

    <q-card class="homecosto">
      <q-img src="../../../assets/img/fondoPanela.jpg">
        <div class="absolute-bottom text-h6">Costo Administrativo</div>
      </q-img>

      <q-card-section class="text-lo">
        {{ lorem }}
      </q-card-section>
    </q-card>
  </div>
</template>   
<script>
export default {
  setup() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        loe: "aaaaaaaaaaaaa"    
};
    
  },
};
</script>

<style >
</style>  
  
    
