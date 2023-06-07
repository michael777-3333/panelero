<template>
  <div>
    <img src="../assets/img/fondo.jpg" class="img-fondo">
  </div>
  <div class="row justify-center d-flex items-center q-mx-sm hfull">
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text-center q-pa-md card-fondo">
      <div>
        <img src="../assets/img/card.png" class="img-card">
      </div>
      <q-form @submit="sesion" class="q-gutter-md  justify-center">
        <q-input filled type="email" v-model="email" label="Ingrese su direccion de correo" class="card-input q-mt-lg" />

        <q-input filled type="password" v-model="password" label="Ingrese su contraseña" class="card-input  q-mt-lg" />

        <div class="q-mt-lg">
          <q-btn label="INGRESAR" type="submit" :disable="btnState" class="bg-white text-black" />
        </div>
      </q-form>
    </div>
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
  </div>
</template>
  
<script setup>
import { useQuasar, QSpinnerFacebook } from "quasar";
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { useUsuarioStore } from '../stores/usuarioStore.js';
import { showAlert } from '../modules/sweetalert.js';

const router = useRouter();
const store = useUsuarioStore();
const $q = useQuasar();


// onBeforeMount(() => {
//   // getDataUsers();
//   // alert("onBeforeMount")
//   // setTimeout(() => {
//   //   // btnState.value = false
//   //   getOrders();
//   // }, 5000)
//   showLoading()

// });

// onMounted(() => {
  // getDataUsers();
  // alert("onBeforeMount")
  // setTimeout(() => {
  //   // btnState.value = false
  //   getOrders();
  // }, 5000)
  // showLoading()
  //   ver.value = true
  // // setTimeout(() => {

  // // }, 1000)
  //   setTimeout(() => {
  //   verd.value = true

  // }, 2000)

// });

// onBeforeUnmount(() => {
//       if (timer !== void 0) {
//         clearTimeout(timer)
//         $q.loading.hide()
//       }
//     });

// function showLoading() {
  // $q.loading.show({
  //   spinner: QSpinnerFacebook,
  //   spinnerColor: 'yellow',
  //   spinnerSize: 140,
  //   backgroundColor: 'purple',
  //   message: 'Some important process is in progress. Hang on...',
  //   messageColor: 'black'
  // })

  // // hiding in 3s
  // timer = setTimeout(() => {
  //   $q.loading.hide()
  //   timer = void 0
  //   ver.value = true

  // }, 1000)
  // // }, 3000)
// }

const email = ref('');
email.value = 'edinson@meaw.co';
const password = ref('1q2w.');

const btnState = ref(false);

if ($q.cookies.get('token')) {
  router.push('/body/home');
}

async function sesion() {
  // btnState.value = true
  let isValid = true
  if (!email.value.trim()) {
    showAlert('Debes ingresar un correo')
    isValid = false
  } else if (!password.value.trim()) {
    showAlert('Debes ingresar una contraseña')
    isValid = false
  }

  if (isValid) {

    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'yellow',
      spinnerSize: 140,
      backgroundColor: 'black',
      message: 'Some important process is in progress. Hang on...',
      messageColor: 'black'
    })

    const res = await store.login({
      email: email.value,
      password: password.value
    });

    $q.loading.hide()

    if (res.data) {
      $q.cookies.set(
        'token',
        res.data.token,
        { expires: "10h", }
      );
      // console.log(res.data.token);
      router.push('/body/home');
    } else {
      const { msg } = res.response.data
      showAlert(msg)

    }
  }
}
</script>

<style></style>