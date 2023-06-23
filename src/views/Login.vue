<template>
  <div class="img-fondo">
    <!-- <img src="../assets/img/fondo.jpg" > -->
  </div>
  <div class="row justify-center d-flex items-center q-mx-sm hfull degr">
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text-center q-pa-md card-fondo animated zoomIn">
      <!-- <div>
        <img src="../assets/img/card.png" class="img-card">
      </div> -->
      <div class="ms-title">Sistema de gestion panelara</div>
      <q-form @submit="sesion" class="q-gutter-md justify-center ">
        <q-input rounded filled type="email" v-model="email" label="Ingrese su direccion de correo" class="card-input q-mt-lg"
        :maxlength="20" />

        <!-- <q-input rounded v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input> -->

        <q-input filled type="password" v-model="password" label="Ingrese su contraseña" class="card-input q-mt-lg" @keyup.enter="sesion" 
        :maxlength="20" />

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
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
import { userService } from "../api/";
import { showAlert } from '../modules/sweetalert.js';

// const store = useUsuarioStore();
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
const isPwd= ref(true)

const password = ref('1q2w.');

const btnState = ref(false);

// if (Cookies.get('token')) {
//   router.push('/body/home');
// }

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
      message: 'Cargando, Por favor espere...',
      messageColor: 'White'
    })

    try {
      const res = await userService.loginUser({
        email:    email.value,
        password: password.value
      });

      // console.log(res);

      if (!res.token) {
        // showAlert(res.token)
        // Cookies.set('token', res.data.token)
        // savedToken(res.data.token)
        // console.log(res.data.token);
        const { msg } = res
        showAlert(msg)
      }

    } catch (error) {
      console.error("Error al inicar seccion", error);
    }

    $q.loading.hide()

  }
}
</script>

<style>
.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}
</style>