<template>
  <div class="justify-center items-center d-flex">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="text-center ">
          <h1 class="tituloh1 text-h6">usuarios</h1>
        </div>
      </div>
      <div class="col-4"></div>
    </div>

    <!--tabla-->

    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="q-pa-md">
          <q-table
            title="Usuarios"
            :rows="rows"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:body-cell-state="props">
              <td>
                <q-checkbox v-model="props.row.state" :true-value="1" :false-value="0" @click="editarEstado(props.row)" />
              </td>
            </template>

            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn class="botonEditar" @click="usuarioEditar(props.row)" glossy label="Editar" />
              </td>     
            
            </template>
      
          </q-table>
        </div>
      </div>
      <div class="col-3"></div>
    </div>

    <!--boton abrir dialog para crear usuario-->
    <div class="contenedorBoton q-pa-md q-gutter-sm">
      <q-btn label="Crear usuario"  style="color: #F39A31;" @click="labelDialog = 'Crear usuraio'; limpiarCajas(); validarCrear = true; alert = true" />
    </div>

    <!--dialog-->
    <q-dialog  v-model="alert">
      <q-card class="dialog">
        <q-card-section>
          <div style="color:black;" class="text-h6">{{labelDialog}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="my-card d-flex">

            <q-card-section>
              <div class="row">
                <div class="col-5">
                  <div class="boton"> 
                    <q-input v-model="name" label="nombre" />
                  </div>
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <div class="boton">
                    <q-select outlined v-model="roles" :options="tipoUsuario" label="Tipo de usuario" />
                  </div>
                </div>
              </div>

              <div v-show="validarCrear == true" class="row d-flex q-m-sm">
                <div class="col-5">
                  <div class="boton">
                    <q-input v-model="email" label="correo" />
                  </div>
                </div>
              <div class="col-2"></div>
              <div class="col-5">
                <div class="boton">
                  <q-input v-model="password" label="contraseña" />
                </div>
              </div>
            </div>
            <div v-show="validarCrear == false"  class="row">
              <div class="boton">
                  <q-input v-model="password" label="contraseña" />
              </div>
            </div>
              <!-- { name: 'editar', label: 'editar'}, -->
            </q-card-section>

            <q-separator />

            <q-card-actions align="center">
              <q-btn @click="createUser();"  style="color:#F39A31 " class="q-my-md" label="Crear Usuario" />
            </q-card-actions>
          </q-card>
        </q-card-section>
    </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsuarioStore } from '../../../stores/usuarioStore.js';
import axios from 'axios';
import { useQuasar } from 'quasar';

async function ordenarUsuarios() {
  // if (hasItToken) {
  //   store.getToken($q.cookies.get('token'))
  // }

  const res = await store.getUsuario()

  if (res.status < 300) {
    rows.value = res.data.usuarios
  } else if (res.response.status == 404) {
    console.log("No existen datos");
  }
}

const store = useUsuarioStore();
const $q = useQuasar();
// const hasItToken = $q.cookies.has('token')
let name = ref('');
let email = ref('');
let password = ref('');
let roles = ref('');
let validarCrear = ref(true);
let rows = ref([]);
let alert = ref(false);
let data = ref(null);
let id = ref(null);

let labelDialog = ref('Crear usuario');

ordenarUsuarios();

async function editarEstado(props) {
  console.log(props);
  if (props.state == 0) {
    await store.activarUsuario(props);
    console.log(data.value);
  }
  else if (props.state == 1) {
    await store.desactivarUsuario(props);
  }

  ordenarUsuarios();
}

//crear o actualizar usuario en la base de datos
async function createUser() {
  if (name.value == '') {
    $q.notify({
      type: 'negative',
      message: 'digite el nombre'
    })
  } else if (roles.value == '') {
    $q.notify({
      type: 'negative',
      message: 'seleccione el tipo de usuario'
    })
  } else if (email.value == '') {
    $q.notify({
      type: 'negative',
      message: 'digite el email'
    })
  } else if (password.value == '') {
    $q.notify({
      type: 'negative',
      message: 'digite la contrasena'
    })
  } else if (validarCrear.value == true) {
    // crear usuario
    const res = await store.addUsuario({ name: name.value, email: email.value, password: password.value, roles: roles.value });
    ordenarUsuarios();
    console.log(rows.value);
    alert.value = false;
    $q.notify({
      type: 'positive',
      message: 'el usuario ha sido creado correctamente'
    });
    limpiarCajas()
  } else if (validarCrear.value == false) {
    // actualizar usuario
    await store.putUsuario({ name: name.value, password: password.value, roles: roles.value, id: id.value });
    ordenarUsuarios();
    alert.value = false;
    $q.notify({
      type: 'positive',
      message: 'el usuario ha sido actualizado correctamente'
    });
    validarCrear.value = true;
    limpiarCajas();
  }
}

const columns = [
  { name: 'state', label: 'Estado', align: "left" },
  {
    label: 'Nombre',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true,
  },

  { name: 'email', align: 'left', label: 'Email', field: 'email' },
  { name: 'roles', align: 'left', label: 'Rol', field: 'roles' },
  // { name: 'password', align: 'left', label: 'Contraseña', field: 'password' },
  { name: 'editar', align: 'left', label: 'editar' },

]


// actualizar usuario, llenar inputs del dialog para actualizar usuario
function usuarioEditar(data) {
  console.log(password.value);
  validarCrear.value = false;
  labelDialog.value = 'Editar Usuario'
  data.value = data;
  console.log(data.value);
  alert.value = true;
  name.value = data.value.name
  email.value = data.value.email
  password.value = ''
  roles.value = data.value.roles
  id.value = data.value._id

  console.log(password.value);
}

let tipoUsuario = [
  'admin', 'moderator', 'user'
];

function limpiarCajas() {
  name.value = ''
  email.value = ''
  roles.value = ''
  password.value = ''
  id.value = null
  labelDialog.value = 'Crear usuraio'
}

</script>

<style>
.tituloh1 {
  font-size: 20px;
}



.boton {
  border-radius: 30px;
  margin: 3px 3px;

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

</style>
