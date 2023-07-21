<template>
  <div class="img-fondo"></div>
  <div class="row justify-center items-center q-mx-sm hfull">
    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text-center q-pa-md card-fondo zoomIn">
      <div class="ms-title">Sistema de gestion panelara</div>
      <q-form @submit="sesion" class="q-gutter-md justify-center">
        <q-input filled type="email" v-model="email" label="Ingrese su direccion de correo" class="card-input q-mt-lg"
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
          <q-btn label="INGRESAR" type="submit" class="bg-white text-black" />
        </div>
      </q-form>
    </div>
  </div>
</template>
  
<script setup>
import { useQuasar, QSpinnerFacebook } from "quasar";
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
import { userService } from "../api/";
import { showAlert } from '../modules/sweetalert.js';

const $q = useQuasar();

const email = ref('');

const isPwd= ref(true);

const password = ref('');

async function sesion() {
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
    
    const error = await userService.loginUser({
      email:    email.value,
      password: password.value
    })

    if(error) {
      showAlert(error.data.msg)
    }

    $q.loading.hide()

  }
}
</script>

<style scope>
.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}
</style>