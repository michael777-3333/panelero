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
        <q-form
          @submit = "sesion"
          class="q-gutter-md  justify-center"
        >
          <q-input
            filled
            type="email"
            v-model="email"
            label="Ingrese su direccion de correo"
            class="card-input rounded-borders q-mt-lg"
            lazy-rules
            :rules="[
              (email) => (email && email.length > 0) || 'por favor digite email',
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Ingrese su contraseña"
            class="card-input rounded-borders q-mt-lg"
            lazy-rules
            :rules="[
              (password) => (password && password !== '') || 'por favor digite contraseña',
            ]"
          />

          <div class="q-mt-lg">
            <q-btn
              label="ENTRAR"
              type="submit"
              class="bg-white text-black"
            />
          </div>
        </q-form>
      </div>
      <div class="col-4"></div>
    </div>
</template>
  
<script setup>
  // import { useQuasar } from "quasar";
  import { ref } from "vue";

  import { useRouter } from "vue-router";
  import { useUsuarioStore } from '../stores/usuarioStore.js'


  const router = useRouter();
  const store = useUsuarioStore();

  Promise.all([store.getUsuario()]).then(response => console.log(response));

  // const $q = useQuasar();

  const email = ref(null);
  const password = ref(null);

  async function sesion() {
    await store.login({email: email.value, password: password.value});

    console.log(store.token);

    if(store.token !== null){
      console.log(store.token);
      router.push("/body/home");
    }else{
      console.log('fallo!');
    }
  }

</script>

<style>
</style>