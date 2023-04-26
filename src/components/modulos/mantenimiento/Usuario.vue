<template>
  <div class="justify-center items-center d-flex">
      <!-- <div class="justify-center items-center d-flex"> -->
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="tituloF text-center ">
          <h1 class="tituloh1 text-h6">usuarios</h1>
        </div>
      </div>
      <div class="col-4"></div>
    </div>


    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">

      <div class=" q-pa-md">
        <q-table class="paddingTabla"
          title="Treats"
          :rows="rows"
          :columns="columns"
          row-key="name"
          
        />
      </div>



      </div>
      <div class="col-3"></div>
    </div>
    <div class="contenedorBoton q-pa-md q-gutter-sm">
      <q-btn label="Crear usuario" style="color: #F39A31;" @click="alert = true" />
    </div>
    <q-dialog  v-model="alert">
      <q-card class="dialog">
        <q-card-section>
          <div style="color:black;" class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="my-card d-flex" style="width: 100%">
            <q-card-section>
              <div class="row">
                <div class="col-5">
                  <div class="boton"> <q-input v-model="name" label="nombre" /></div>
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <div class="boton"><q-input v-model="identificacion" label="identificacion" /></div>
                </div>
              </div>
              <div class="row d-flex q-m-sm">
                <div class="col-5">
                  <div class="boton"><q-input v-model="email" label="correo" /></div>
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <div class="boton"><q-input v-model="password" label="contraseña" /></div>
                </div>
              </div>
              <div class="row d-flex q-m-sm">

                <div class="col-5">
                  <div class="boton"><q-select outlined v-model="model" :options="tipoUsuario" label="Tipo de usuario" />
                  </div>
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <div class="boton"><q-input v-model="eps" label="EPS" /></div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="center">
              <q-btn @click="createUser()" style="color:#F39A31 " class="q-my-md" label="Crear Usuario" />
            </q-card-actions>
          </q-card>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" style="color:#F39A31 " v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </div>
</template>

<script setup>

  import { ref } from 'vue';

  import { useUsuarioStore } from '../../../stores/usuarioStore.js'

  const store = useUsuarioStore()

  let name = ref('');
  let email = ref('')
  let password = ref('')
  let eps = ref('')
  let model = ref('')
  let identificacion = ref('')

  let rows = ref()

  async function createUser() {
      

    await store.addUsuario({name: name.value, email: email.value, password: password.value, eps: eps.value, identification: identificacion.value, tipoUsuario:model.value })
    
    Promise.all([store.getUsuario()]).then(response => rows.value = response[0].data.users)
    
    console.log(rows.value);
    alert.value = false 
  }

    Promise.all([store.getUsuario()]).then(response => rows.value = response[0].data.users)



  const columns = 
    [
      {
        required: true,
        label: 'Nombre',
        align: 'left',
        field: row => row.name, 
        format: val => `${val}`,
        sortable: true
      },
      
      { name: 'email', label: 'Email', field: 'email' },
      { name: 'password', label: 'Contraseña', field: 'password' },
      { name: 'eps', label: 'EPS', field: 'eps' },
      { name: 'identificacion', label: 'Indentificacion', field: 'identification' },
      { name: 'model', label: 'Rol', field: 'user_type' },

    ] 
    

  let alert = ref(false)
  
  let tipoUsuario = [
    'Super Usuario', 'Administrador', 'Usuario'
  ]

</script>

<style>
.titulo {
  /* width: 10px; */
  /* height: 10px; */
  background-color: #F39A31;
  border-radius: 30px;
  /* width: 400px;
  margin-left: 37%; */

}

.tituloh1 {
  font-size: 20px;
}

/* .my-card{
    background-color: #f3993181;
    border-radius: 30px;
    margin-left: 60%;
} */
.boton {
  /* margin-top: 5px; */
  /* background-color: #cace06; */
  border-radius: 30px;
  margin: 3px 3px;
  /* height: 40px; */
}

.my-card-width {
  max-width: 600px;
}

.contenedorBoton {
  margin-left: 44%;
}
.dialog{
  background-color: #F39A31;
  width: 1000px;
}

.padingTabla{
  background-color: rgb(218, 11, 138);
}

.tabla{
  background-color: rgb(245, 141, 13);
}

.rowPrincipal{
  background-color: rgb(16, 16, 122);
}



/*  */</style>