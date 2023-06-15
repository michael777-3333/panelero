<template>
  <div class="justify-center d-flex">
    <!--tabla-->
    <div class="row">
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">

              <!-- SECCION FORMULARIO -->
      <div v-show="modalUser" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">{{ labelDialog }}</span>

          <q-btn @click="modalUser = !modalUser" class="bg-red text-white float-right" label="X" />
          <!-- <span><br><br></span> -->
        </q-card-section>

        <!-- FORMULARIO -->
        <q-card-section class="bgColorEnfasis q-pt-none">
          <q-card class="d-flex">
            <q-card-section>
              <div class="row">
                <!-- <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                    <q-input v-model="cliente" label="Cliente" :dense="dense" :readonly="readonly" />
                  </div> -->
                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="roles" :options="tipoUsuario" label="tipo de usuario" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>

                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="email" label="Correo" :readonly="readonly" />
                </div>

                <div v-show="isAdd" class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="password" label="Contraseña" :readonly="readonly" />
                </div>


              </div>
            </q-card-section>
            <q-separator />



          </q-card>
          <!-- </q-card-section>
          <q-card-section> -->
          <div align="right" class="q-mt-md">
            <q-btn @click="modalUser = !modalUser" class="bg-red text-white q-mx-sm" label="Cerrar" />

            <q-btn class="bg-white">
              <span v-if="isAdd == true" @click="createUser()">Crear Pedido</span>
              <span v-else @click="_modifyUser()">Modificar Pedido</span>
            </q-btn>
          </div>
        </q-card-section>
        <!-- FORMULARIO -->
      </div>
      <!-- SECCION FORMULARIO -->

        <div v-if="rows.length > 0" v-show="!modalUser" class="q-ma-xs-md q-ma-lg-sm">
          <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen usuarios!"
            :visible-columns="visibleColumns">
            <template v-slot:top="props">

              <div class="col-6" align="left"><span style="font-size: 25px;">Usuarios</span></div>
              <div class="col-6" align="right">
                <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="newUser()"
                  glossy label="Crear Usuario" />
              </div>

            </template>

            <template v-slot:body-cell-state="props">
              <td>
                <q-checkbox keep-color="" color="green" v-model="props.row.state" :true-value="1" :false-value="0"
                  @click="editState(props.row)" />
              </td>
            </template>

            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn class="botonEditar" style="background-color: #029127;" @click="modifyUser(props.row)">
                  <q-icon style="color: white;" name="edit"></q-icon>
                </q-btn>
              </td>

            </template>
          </q-table>

        </div>
        <div v-else class="q-ma-xs-md q-ma-lg-sm" style="margin-top: 5%;">
          <q-linear-progress dark query color="green" class="q-mt-sm" />
          <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" />
        </div>
      </div>
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
    </div>



    <!--dialog-->
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { userService } from "../../../api/";
import { showAlert } from '../../../modules/sweetalert.js';

let email = ref('');
let password = ref('');
let roles = ref('');
let dense = ref(!true);
let denseOpts = ref(true);
let readonly = ref(false);

let tipoUsuario = ['admin', 'moderator', 'user'];
let id = null;
let isAdd = ref(true);
let modalUser = ref(false);
let rows = ref([]);
let visibleColumns = ref(['state', 'email', 'roles', 'editar'])
const columns = [
  {
    name: "id",
    label: "id",
    field: (row) => row._id,
    format: (val) => `${val}`,
  },
  { name: 'state', label: 'Estado', field: "state", align: "left", sortable: true, },
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
  let rol = ['-']
  let _roles = []

  if (arrayRoles.length > 0) {
    for (let index = 0; index < arrayRoles.length; index++) {
      const element = arrayRoles[index];
      _roles.push(element.name)
    }

    if (_roles.includes('admin')) {
      rol[0] = 'admin'
    } else if (_roles.includes('moderator')) {
      rol[0] = 'moderator'
    } else if (_roles.includes('user')) {
      rol[0] = 'user'
    }
  }

  return rol
}

async function getUsers() {
  try {
    let res = {}

    res['usuario'] = await userService.getUser()

    rows.value = res['usuario']
    if (res['usuario'].length === 0) {
      showAlert('No se encontraron registros', 'info')
      console.log("No se encontraron registros");
    }


  } catch (error) {
    console.error("Error al obtener las peticiones", error);
  }

}

getUsers();

function closeModal() { // Cierro el modal
  function limpiarCajas() { // Vacio los formularios
    email.value = roles.value = password.value = ''
  }
  id = null
  getUsers(); // Actualizo la tabla
  limpiarCajas()
  modalUser.value = false // Cierro el modal
  isAdd.value = false
}

async function editState(props) {
  // console.log(props);
  // TODO: Analizar esta parte, alpacer se cambia el estado desde antes
  if (props.state == 0) {
    // console.log(0, props);
    await userService.disabledUser(props._id);
  }
  else if (props.state == 1) {
    await userService.enabledUser(props._id);
    // console.log(1, props);
  }

  getUsers();
}

function newUser() {
  modalUser.value = true
  isAdd.value = true
}

function validations() {

  if (roles.value == '') {
    showAlert('Seleccione el tipo de usuario')
  } else if (email.value == '') {
    showAlert('Digite el email')
  }
  else if (password.value == '' && isAdd.value) {
    showAlert('Digite la contraseña')
  }
  else { return true }
}


//crear usuario en la base de datos
async function createUser() {
  if (validations() && isAdd.value) {
    // fctn de la peticion para crear usuario
    const res = await userService.addUser({
      email: email.value,
      password: password.value,
      roles: roles.value,
    });

    if (res.status == 201) {
      showAlert(res.data.msj, 'success')
    }
    closeModal()
  }
}

function modifyUser(data) {
  // console.log(data);
  modalUser.value = true;
  isAdd.value = false
  id = data._id
  // validarCrear=false
  // Traigo los datos a las cajas de textos
  email.value = data.email
  roles.value = getRol(data.roles)
}

async function _modifyUser() {
  if (validations() && !isAdd.value && id != null) {
    // fctn de la peticion para editar usuario
    // console.log(roles.value);

    const res = await userService.editUser({
      id: id,
      email: email.value,
      roles: roles.value
    });

    if (res.status == 200) {
      showDoneMessage(res.data.msj)
    }
    closeModal()
  }
}
function cerrarModal() {
  // validarCrear = true
  closeModal()
  isAdd.value = false
}

</script>

<style scope>
.boton {
  border-radius: 50px;
  margin: 3px 3px;
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
.input{
  border-radius: 50px;
  /* background-color: rgba(0, 128, 0, 0.287); */

}
.card{
  color: white;
  background-color: green;
}
.card1{
  margin-top: 30px;
}
</style>
