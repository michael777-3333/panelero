<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <q-card class="my-card">
                    <q-card-section>
                        <q-card-title class="textoTituloCard">Costos Etapa</q-card-title>
            
                    </q-card-section>
        
                    <q-card-section class="row justify-center">
                        <q-btn  class="botonCard q-mr-md" label="Ir Costo etapas"  />
            
                    </q-card-section>
                </q-card>

            </div>
        </div>


    </div>
</template>

<!-- <script >
  export default {
    beforeCreate() {
      console.log("No se ha ejecutado nada todavía");
    },
//   };
//   export default {
    data: () => ({
      info: null,
    }),
    created() {
      this.info = "Componente cargado";
    },
  };
</script> -->

<!-- <script setup>
//   import { beforeCreate } from 'vue';

//   beforeCreate(() => {
//     console.log("No se ha ejecutado nada todavía");
//   });
const app = Vue.createApp({
    data() {
        return {
            search: null,
            // favorites: new Map()
        }
    },
    created(){
        console.log("search");
    }
})
</script> -->


<!-- <script>
  export default {
    beforeCreate() {
      console.log("No se ha ejecutado nada todavía");
    },
  };
</script> -->

<style>
    .my-card{
        text-align: center;
        width: 200px;
    }
    
</style>