<template>
  <div class="row justify-center items-center h-2">
    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center q-px-xs-sm">

      <!-- formulario -->
      <div class="q-ma-xs-md q-ma-lg-sm animated zoomIn" v-show="modalUser">
      <q-card> 
        <q-card-section class="bgColorEnfasis" align="start">
          <span class="text-white text-h6">{{ labelDialog }}</span>

          <!-- <q-btn @click="modalUser = !modalUser" class="bg-red text-white float-right" label="X" /> -->
        </q-card-section>

        <q-card-section>
          <div class="row">
              <div class="col-xs-12 col-sm-6 q-pa-xs-sm q-px-sm-lg">
                <q-select filled v-model="roles" :options="tipoUsuario" label="tipo de usuario" stack-label :dense="dense" :options-dense="denseOpts" />
              </div>

              <div class="col-xs-12 col-sm-6 q-pa-xs-sm q-px-sm-lg">
                <q-input filled v-model="email" label="Correo" :readonly="readonly" />
              </div>

              <div v-show="isAdd" class="col-xs-12 col-sm-6 q-pa-xs-sm q-px-sm-lg">
                <q-input filled v-model="password" label="Contraseña" :readonly="readonly" />
              </div>
            </div>
          </q-card-section>
              
          <q-separator />

          <div align="right" class="q-py-sm">
            <q-btn @click="closeModal()" class="bg-red text-white q-mr-sm" label="Cerrar" />
            
            <q-btn class="bg-white q-mr-sm">
              <span v-if="isAdd == true" @click="saveChanges()">Crear Usuario</span>
              <span v-else @click="saveChanges()">Modificar Usuario</span>
            </q-btn>
          </div>
        </q-card>    
      </div>
        
      <div v-if="rows.length > 0" v-show="!modalUser" class="q-ma-xs-md q-ma-lg-sm">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen usuarios!" :visible-columns="visibleColumns">
          <template v-slot:top>
            <div class="col-6" align="left">
              <span style="font-size: 25px;">Usuarios</span>
            </div>
              
            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="newUser()" glossy label="Crear Usuario" />
            </div>
          </template>

          <template v-slot:body-cell-state="props">
            <td>
              <q-checkbox color="green" v-model="props.row.state" :true-value="1" :false-value="0" @click="editState(props.row)" />
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
  },
  { name: 'state', label: 'Estado', field: "state", },
  { name: 'email', label: 'Email', field: 'email', },
  {
    name: 'roles', label: 'Rol',
    field: row => row.roles,
    format: (val) => getRol(val)
  },
  { name: 'editar', label: 'Opciones' },
]

let labelDialog = ref('Crear Usuario');

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
  let {data, status} = await userService.getUser()

  if(status == 200) {
    rows.value = data || [];
  }
}

getUsers();

function closeModal() {
  function limpiarCajas() {
    email.value = roles.value = password.value = ''
  }
  id = null
  getUsers();
  limpiarCajas()
  modalUser.value = false
  isAdd.value = false
}

async function editState(props) {
  if (props.state == 0) {
    await userService.disabledUser(props._id);
  }
  else if (props.state == 1) {
    await userService.enabledUser(props._id);
  }

  getUsers();
}

function validations() {
  if (roles.value == '') {
    showAlert('Seleccione el tipo de usuario')
  } else if (email.value == '') {
    showAlert('Digite el email')
  } else if (password.value == '' && isAdd.value) {
    showAlert('Digite la contraseña')
  } else { 
    return true 
  }
}

function newUser() {
  modalUser.value = true
  isAdd.value = true
}

function modifyUser(data) {
  modalUser.value = true;
  isAdd.value = false
  id = data._id
  email.value = data.email
  roles.value = getRol(data.roles)
}

async function saveChanges() {
  let data = {
    email: email.value,
    roles: roles.value,
  }

  if (validations() && isAdd.value) {
    data['password'] = password.value
    
    await userService.addUser(data);

    closeModal()
  } else if (validations() && !isAdd.value && id != null) {
    data['id'] = id.value
    await userService.editUser(data);

    closeModal()
  }

}

</script>

<style scope>
</style>
