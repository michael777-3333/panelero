<template>
  <div>
    <img src="../assets/img/fondo.jpg" class="fondo ">
  </div>
  <div class="row justify-center d-flex items-center" style="height: 100vh;">
    <div class="col-4 "></div>
    <div class="col-4 text-center rounded-borders q-pa-md card-fondo">
      <div>
        <img src="../assets/img/card.png" class="img-card">
      </div>
      <q-form @submit="sesion" class="q-gutter-md  justify-center">
        <q-input filled type="email" v-model="email" label="Ingrese su direccion de correo"
          class="card-input rounded-borders q-mt-lg"/>

        <q-input filled type="password" v-model="password" label="Ingrese su contraseña"
          class="card-input rounded-borders q-mt-lg"  />

        <div class="q-mt-lg">
          <q-btn label="INGRESAR" type="submit" :disable="btnState" class="bg-white text-black" />
        </div>
      </q-form>
    </div>
    <div class="col-4"></div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useUsuarioStore } from '../stores/usuarioStore.js';


const router = useRouter();
const store = useUsuarioStore();
const $q = useQuasar();

const email = ref('wilmer@gmail.com');
const password = ref('1q2w.');

const btnState = ref(false);

if($q.cookies.get('token')) {
  router.push('/body/home');
}

async function sesion() {
  btnState.value = true
  if(!email.value.trim()) {
    $q.notify({
      type: 'negative',
      message: 'por favor ingrese email' 
    });
    setTimeout(()=>{
      btnState.value = false
    }, 5000)
  } else if(!password.value.trim()) {
    $q.notify({
      type: 'negative',
      message: 'por favor ingrese contraseña' 
    })
    setTimeout(()=>{
      btnState.value = false
    }, 5000)
  } else {
    const res = await store.login({
      email: email.value,
      password: password.value
    });
    console.log(res)

    if(res.data) {
      // falta hacer uso de cookies
      $q.cookies.set(
        'token',
        res.data.token,

        { expires: "10h", }
      );
      console.log(res.data.token);
      router.push('/body/home');
    } else {
      const { msg } = res.response.data

      $q.notify({
        type: 'negative',
        message: msg
      })

      setTimeout(()=>{
        btnState.value = false
      }, 5000)
    }
  }
}

</script>

<style></style>