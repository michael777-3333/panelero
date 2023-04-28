<template>
  <div>
    <img src="../assets/img/fondo1.jpg" class="img1">
  </div>
  <div class="cad items-center justify-center bg-d">
    <div class="row justify-center d-flex items-center" style="height: 100vh">
      <div class="card1 col-4 "></div>
       <div class="col-4 text-center rounded-borders q-pa-md car">
        <div class="logi-mg">
          <img src="../assets/img/fondo2.png" class="img">
        </div>
        
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md justify-center"
          >
          <q-input
            filled
            type="email"
            v-model="email"
            label="Ingrese su correo *"
            class="car1 rounded-borders q-mt-lg d-flex"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            class="car1 rounded-borders"
            type="password"
            v-model="password"
            label="Ingrese su contraseña *"
            lazy-rules
            text-color="white"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your contraseña',
              (val) =>
                (val > 0 && val < 100) || 'Please type a real contraseña',
            ]"
          />

          <div class="q-mt-lg q-mb-lg">
            <p class="text-white">Olvide mi contraseña?</p>
            <q-btn
              @click="sesion()"
              label="INICIO"
              type="submit"
              color="white"
              text-color="black"
            />
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

import { useRouter } from "vue-router";

const router = useRouter();

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
  router.push("/body/home");
}
</script>
<style>

</style>