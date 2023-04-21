<template>

  <div class="items-center justify-center section" style="height: 100vh" > 
      
        <div class="row q-ma-xs justify-center d-flex items-center">
          <div class="col-4"></div>
          <div class="col-4 text-center  q-pa-xs" style="background-color: #303030ab;">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" >
              <q-input
                filled
                type="email"
                v-model="email"
                label="Ingrese su correo *"
                class="bg-white rounded-borders"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please type something']"
              />
           
      
              <q-input
                filled
                class="bg-white rounded-borders"
                type="password"
                v-model="password"
                label="Ingrese su contraseña *"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Please type your contraseña',
                  (val) => (val > 0 && val < 100) || 'Please type a real contraseña',
                ]"
              />
      
              <div>
                <p class="text-white">Olvide mi contraseña?</p>
                <q-btn @click="sesion()" label="Submit" type="submit" color="primary" />
                
              </div>
            </q-form>
            
          </div>
          <div class="col-4"></div>
        </div>

        </div>
    
      <!-- <div class="row section ">
        <div class="col-12">
          <div class="row">
            <div class="col-12">
            <br>
                    <span class="q-ma-xl"></span>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <span class="q-ma-xl"></span>
        <h1 style="">.</h1>
          </div>
        </div>

        <div class="row q-ma-xs">
          <div class="col-4"></div>
          <div class="col-4 text-center q-pa-xs" style="background-color: #303030ab;">
            <div class="q-pa-md" style="max-width: 400px">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                type="email"
                v-model="email"
                label="Ingrese su correo *"
                class="bg-white rounded-borders"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please type something']"
              />
              hint="correo"
      
              <q-input
                filled
                class="bg-white rounded-borders"
                type="password"
                v-model="password"
                label="Ingrese su contraseña *"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Please type your contraseña',
                  (val) => (val > 0 && val < 100) || 'Please type a real contraseña',
                ]"
              />
      
              <q-toggle v-model="accept" label="I accept the license and terms" />
      
              <div>
                <p class="text-white">Olvide mi contraseña?</p>
                <q-btn @click="sesion()" label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
            </div>
          </div>
          <div class="col-4"></div>
        </div>
      </div>
    </div>
  </div> -->
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
.section {
    background-image: url("../src/assets/img/bgll.jpg");
    background-repeat: no-repeat;
    background-position: absolute;
}

</style>