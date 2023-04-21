<template>
  <div class="items-center justify-center bg-d"> 
    <div class="row justify-center d-flex items-center" style="height: 100vh" >
      <div class="col-4"></div>
      <div class="col-4 text-center rounded-borders q-pa-md bg-teal-14">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md justify-center" >
            <q-input
              filled
              type="email"
              v-model="email"
              label="Ingrese su correo *"
              class="bg-light-green-1 rounded-borders q-mt-lg d-flex"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something'
                ]"
            />
           
      
              <q-input
                filled
                class="bg-light-green-1 rounded-borders"
                type="password"
                v-model="password"
                label="Ingrese su contraseña *"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Please type your contraseña',
                  (val) => (val > 0 && val < 100) || 'Please type a real contraseña',
                ]"
              />
      
              <div class="q-mt-lg q-mb-lg">
                <p class="text-white">Olvide mi contraseña?</p>
                <q-btn @click="sesion()" label="Submit" type="submit" color="light-green-9" />
                
              </div>
            </q-form>
            
          </div>
          <div class="col-4"></div>
        </div>

        </div>
    
     
  </template>
  
<script setup>
  import useQuasar from "quasar/src/composables/use-quasar.js";
  import { ref } from "vue";

  import {useRouter} from "vue-router"

  const router = useRouter()

  const $q = useQuasar();

  const email = ref(null);
  const password = ref(null);
  const accept = ref(false);

    function onSubmit() {
      if (accept.value !== true) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first",
        });
      } else {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      }
    }

    function onReset() {
      email.value = null;
      password.value = null;
      accept.value = false;
    }
    

  function sesion() {
    router.push("/body")
  }

  </script>

<style>
.bg-d {
  height: 100vh;
  background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,60,1) 35%, rgba(0,212,255,1) 100%);
}
/* .section {
    background-image: url("../src/assets/img/bgll.jpg");
    background-repeat: no-repeat;
    background-position: absolute;
} */

</style>