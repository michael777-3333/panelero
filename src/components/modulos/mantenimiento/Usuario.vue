<template>
  <div class="justify-center items-center d-flex">
    <!--tabla-->
    <div class="row">
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text-center">

        <div class="row q-ma-md">
          <div class="col-4"></div>
          <div class="col-4 ">
            <h1 class="text-h6 bgColorEnfasis borderTitle">Usuarios</h1>
          </div>
          <div class="col-4"></div>
          <div class="col-12 q-my-md">
            <!--boton abrir dialog para crear usuario-->
            <q-btn class="colorEnfasis" label="Crear usuario" @click="addUser()" />
          </div>
        </div>

        <div class="q-ma-xs-md q-ma-lg-sm">
          <q-table :rows="rows" :columns="columns" row-key="id" :visible-columns="visibleColumns"
            no-data-label="No existen usuarios!">
            <template v-slot:body-cell-state="props">
              <td>
                <q-checkbox v-model="props.row.state" :true-value="1" :false-value="0" @click="editState(props.row)" />
              </td>
            </template>

            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn class="botonEditar" @click="editUser(props.row)" glossy label="Editar" />
              </td>

            </template>
          </q-table>

        </div>
      </div>
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
    </div>



    <!--dialog-->
    <q-dialog v-model="modalUser">
      <q-card class="dialog">
        <q-card-section>
          <div style="color: white;" class="text-h6">{{ labelDialog }}</div>
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
                    <q-select outlined v-model="roles" :options="tipoUsuario" label="tipo de usuario" />
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
              <div v-show="validarCrear == false" class="row">
                <div class="boton">
                  <q-input v-model="password" label="contraseña" />
                </div>
              </div>
              <!-- { name: 'editar', label: 'editar'}, -->
            </q-card-section>

            <q-separator />

            <q-card-actions align="center">
              <q-btn class="q-my-md colorEnfasis">
                <span v-if="isAdd == true" @click="createUser()">Crear Usuario</span>
                <span v-else @click="modifyUser()">Modificar Usuario</span>
              </q-btn>
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
import { useQuasar } from 'quasar';

const $q = useQuasar();
const store = useUsuarioStore();

let name = ref('');
let email = ref('');
let password = ref('');
let roles = ref('');
let validarCrear = ref(true);

let tipoUsuario = ['admin', 'moderator', 'user'];
let id = null;
let isAdd = ref(true);
let modalUser = ref(false);
let rows = ref([]);
let visibleColumns = ref(['state', 'nombre', 'email', 'roles', 'editar'])
const columns = [
  {
    name: "id",
    label: "id",
    field: (row) => row._id,
    format: (val) => `${val}`,
  },
  { name: 'state', label: 'Estado', field:"state", align: "left",  sortable: true,},
  { name: 'nombre', align: 'center', label: 'Nombre', field: 'name', sortable: true, },
  { name: 'email', align: 'center', label: 'Email', field: 'email' },
  {
    name: 'roles', align: 'center', label: 'Rol',
    field: row => row.roles,
    format: (val) => getRol(val)
  },
  { name: 'editar', align: 'center', label: 'Opciones' },

]

let labelDialog = ref('Crear usuario');

function getRol(arrayRoles) {
  let rol = '-'
  let _roles = []

  if (arrayRoles.length > 0) {
    for (let index = 0; index < arrayRoles.length; index++) {
      const element = arrayRoles[index];
      _roles.push(element.name)
    }

    if (_roles.includes('admin')) {
      rol = 'admin'
    } else if (_roles.includes('moderator')) {
      rol = 'moderator'
    } else if (_roles.includes('user')) {
      rol = 'user'
    }
  }

  return rol
}

async function getUsers() {

  const res = await store.getUsuario()
  console.log(res.data.usuarios);
  if (res.status < 300) {
    rows.value = res.data.usuarios
  } else if (res.response.status == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}

getUsers();

function closeModal() { // Cierro el modal
  function limpiarCajas() { // Vacio los formularios
    name.value = email.value = roles.value = password.value = ''
  }
  id = null
  getUsers(); // Actualizo la tabla
  limpiarCajas()
  modalUser.value = false // Cierro el modal
  isAdd.value = false
}

async function editState(props) {
  if (props.state == 0) {
    await store.activarUsuario(props);
  }
  else if (props.state == 1) {
    await store.desactivarUsuario(props);
  }

  getUsers();
}

function addUser() {
  modalUser.value = true
  isAdd.value = true
}

function validations() {
  function showMessage(msg) {
    $q.notify({
      type: 'negative',
      message: msg
    })
  }

  if (name.value == '') {
    showMessage('digite el nombre')
  } else if (roles.value == '') {
    showMessage('Seleccione le tipo de usuario')
  } else if (email.value == '') {
    showMessage('Digite el email')
  } else if (password.value == '') {
    showMessage('Digite la contraseña')
  } else { return true }
}

function showDoneMessage(msg) {
  $q.notify({
    type: 'positive',
    message: msg
  })
}

//crear usuario en la base de datos
async function createUser() {
  if (validations() && isAdd) {
    // fctn de la peticion para crear usuario
    const res = await store.addUsuario({
      name: name.value,
      email: email.value,
      password: password.value,
      roles: roles.value,
    });

    if (res.status == 200) {
      showDoneMessage(res.data.msj)
    }
    closeModal()
  }
}

async function editUser(data) {
  modalUser.value = true;
  isAdd.value = false
  id = data._id
  // Traigo los datos a las cajas de textos
  name.value = data.name
  email.value = data.email
  password.value = ''
  roles.value = getRol(data.roles)
}

async function modifyUser() {
  if (validations() && !isAdd && id != null) {
    // fctn de la peticion para editar usuario
    const res = await store.putUsuario({
      id: id,
      name: name.value,
      email: email.value,
      password: password.value,
      roles: roles.value
    });

    if (res.status == 200) {
      showDoneMessage(res.data.msj)
    }
    closeModal()
  }
}

</script>

<style>

  .boton {
    border-radius: 30px;
    margin: 3px 3px;
  }


  .dialog {
    background-color: #F39A31;
    width: 1000px;
  }

  .padingTabla {
    background-color: rgb(218, 11, 138);
  }

  .tabla {
    background-color: rgb(245, 141, 13);
  }

  .rowPrincipal {
    background-color: rgb(16, 16, 122);
  }

</style>
