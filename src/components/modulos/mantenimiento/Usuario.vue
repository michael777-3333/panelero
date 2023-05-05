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
      <q-btn label="Crear usuario"  style="color: #F39A31;" @click="alert = true" />
    </div>

    <!--dialog-->
    <q-dialog  v-model="alert">
      <q-card class="dialog">
        <q-card-section>
          <div style="color:black;" class="text-h6">Alert</div>
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
                    <q-select outlined v-model="typeUser" :options="tipoUsuario" label="Tipo de usuario" />
                  </div>
                </div>
              </div>

              <div class="row d-flex q-m-sm">
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
              <!-- { name: 'editar', label: 'editar'}, -->
            </q-card-section>

            <q-separator />

            <q-card-actions align="center">
              <q-btn @click="createUser()"  style="color:#F39A31 " class="q-my-md" label="Crear Usuario" />
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
    await Promise.all([store.getUsuario()]).then(response => rows.value = response[0].data.usuarios);
  }
  
  const store = useUsuarioStore();
  const $q = useQuasar();
  let name = ref('');
  let email = ref('');
  let password = ref('');
  let typeUser = ref('');
  let validarCrear = ref(true);
  let rows = ref([]);
  let alert = ref(false);
  let data = ref(null);
  let id = ref(null);
  
  ordenarUsuarios();

  async function editarEstado(props) {
    console.log(props);
    if(props.state == 0){
      await axios.put(`http://localhost:3000/usuario/desactivar/${props._id}`,{
        token: store.token
      })
      .then(response=> console.log(response))
      .catch(error=>console.log(error));
    }
    else if(props.state == 1){
      await axios.put(`http://localhost:3000/usuario/activar/${props._id}`,{
        token: store.token
      })
      .then(response=> console.log(response))
      .catch(error=>console.log(error));
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
    }else if (typeUser.value == '') {
      $q.notify({
          type: 'negative',
          message: 'seleccione el tipo de usuario'
      })
    }else if (email.value == '') {
      $q.notify({
          type: 'negative',
          message: 'digite el email'
      })
    }else if (password.value == '') {
      $q.notify({
          type: 'negative',
          message: 'digite la contrasena'
      })
    }else if(validarCrear.value == true){
      // crear usuario
      await store.addUsuario({name: name.value, email: email.value, password: password.value, typeUser: typeUser.value});
      ordenarUsuarios();
      console.log(rows.value);
      alert.value = false;
      $q.notify({
          type: 'positive',
          message: 'el usuario ha sido creado correctamente'
      });
      limpiarCajas()
    }else if (validarCrear.value == false) {
      // actualizar usuario
      await store.putUsuario({name: name.value, email: email.value, password: password.value, typeUser: typeUser.value, id: id.value});
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
    { name: 'state', label : 'Estado' ,align:"left" },
    {
      label: 'Nombre',
      align: 'left',
      field: row => row.name, 
      format: val => `${val}`,
      sortable: true,
    },
      
    { name: 'email', align: 'left', label: 'Email', field: 'email' },
    { name: 'typeUser', align: 'left', label: 'Rol', field: 'typeUser' },
    
    // { name: 'password', align: 'left', label: 'Contraseña', field: 'password' },
    { name: 'editar', align: 'left', label: 'editar'},

  ] 


  // actualizar usuario, llenar inputs del dialog para actualizar usuario
  function usuarioEditar(data) {
    console.log(password.value);
    validarCrear.value = false;
    data.value = data;
    console.log(data.value);
    alert.value = true;
    name.value = data.value.name
    email.value = data.value.email
    password.value = ''
    typeUser.value = data.value.typeUser
    id.value = data.value._id

    console.log(password.value);
  }

  let tipoUsuario = [
    'super usuario', 'administrador', 'usuario'
  ];

  function limpiarCajas() {
    name.value = ''
    email.value = ''
    typeUser.value = ''
    password.value = ''
    id.value = null
  }
</script>

<style>
.tituloh1 {
  font-size: 20px;
}

.botonEditar{
  background-color: #F39A31;
  border-radius: 10px;
}

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


</style>

<!-- const columns = [
  {
    name: "cedula",
    align: "center",
    label: "Cedula/Nit",
    field: "cedula",
    headerStyle: "padding:0px",
  },
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "center",
    field: (row) => row.nombre,
    format: (val) => `${val}`,
    sortable: true,
    headerStyle: "padding: 0px 10px 0px 10px",
    //añadir clase para el tamaño de la columna
  },
  {
    name: "direccion",
    align: "center",
    label: "Dirección",
    field: "direccion",
    headerStyle: "padding: 0px 10px 0px 10px",
  },
  {
    name: "telefono",
    align: "center",
    label: "Telefono",
    field: "telefono",
    headerStyle: "padding: 0px",
  },
  {
    name: "celular",
    align: "center",
    label: "Celular",
    field: "celular",
    headerStyle: "padding: 0px",
  },
  {
    name: "verificado",
    align: "center",
    label: "Acciones",
    field: "verificado",
    headerStyle: "padding: 0px;",
  },
];
</script>
<template>
  <div class="q-pa-sm">
    <q-table
      class="TablePageClientes"
      :rows="clientes"
      :columns="columns"
      row-key="name"
      separator="cell"
      :rows-per-page-options="[10, 20, 30, 40, 50]"
      rows-per-page-label="Filas por página"
      :pagination="pagination"
    >

    <template v-slot:pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage || props.isSearching"
          @click="() => { scope.firstPage(); pagination.onFirstPage(); }"
        />

        <q-btn
          icon="chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="pageSelect <= 1 || props.isSearching"
          @click="() => { scope.prevPage(); pagination.onPrevPage(scope.pagination.rowsPerPage); }"
        />

        <q-btn
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="props.clientes.length <=1 || props.isSearching"
          @click="() => { scope.nextPage(); pagination.onNextPage(scope.pagination.rowsPerPage)}"
        />

      </template>

      <template v-slot:body-cell-verificado="props">
        <td
          class=""
          style="padding: 0px; margin: 0px; min-width: 150px; max-width: 200px"
        >
          crear tres botones para el estado
          <q-btn-group class="full-width full-height" outline square>
            <q-btn
              icon="edit_note"
              text-color="blue-10"
              class="col text-bold text-subtitle1 btnAccion1"
              @click="goTo('clientes/editCliente', props.row._id)"
            />
            <q-btn
              icon="highlight_off"
              text-color="blue-10"
              class="col text-bold text-subtitle1 btnAccion1"
              @click="deleteCliente(props.row._id, props.row.nombre)"
            />

            <q-btn-group outline class="q-px-md btnsAccion2">
              <q-btn
                label="V"
                color="blue-10"
                @click="props.row.verificado = 1; verificarCliente(props.row._id)"
                class="col text-bold text-subtitle1 btnAccion2 q-px-md"
                :class="props.row.verificado === 1 ? 'bg-light-blue-8' : ''"
              />
              <q-btn
                label="SV"
                color="blue-10"
                @click="props.row.verificado = 0; noverificadoCliente(props.row._id)"
                class="col text-bold text-subtitle1 btnAccion2 q-px-md"
                :class="props.row.verificado === 0 ? 'bg-light-blue-8' : ''"
              />
            </q-btn-group>
          </q-btn-group>
        </td>
      </template>
    </q-table>
  </div>
</template> -->