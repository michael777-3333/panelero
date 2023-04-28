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

        >


      <template v-slot:body-cell-state="props">
        <!-- <q-toggle @click="test()" v-model="scope.selected" /> -->
             
              <q-checkbox  @click="test(props.row._id,props)"   />

              <!-- :v-model="val[props.row._id].status = props.row.state" -->
      </template>

      <template v-slot:body-cell-editar="props">
               <td >
                <q-btn class="botonEditar" @click="modal(JSON.stringify(props.row))" glossy label="Editar" />
               </td>     
        
      </template>
      
    </q-table>
    <!-- 
      
     -->
      <!-- </q-table> -->
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
  
  import axios from 'axios';

  const store = useUsuarioStore()

  let val = ref()
  let name = ref('');
  let email = ref('')
  let password = ref('')
  let eps = ref('')
  let model = ref('')
  let identificacion = ref('')
  let state= ref()
  let rows = ref()
  let alert = ref(false)

 async function test(id,prueba) {
  if(prueba.value == 1){
    await axios.put(`http://localhost:3000/usuario/desactivar/${id}`).then(response=> console.log(response.data.msj));
  }
  else if(prueba.value == 0){
      await axios.put(`http://localhost:3000/usuario/activar/${id}`).then(response=> console.log(response.data.msj));
  }
  console.log(prueba.value)

  Promise.all([store.getUsuario()]).then(response => rows.value = response[0].data.users)
}
 

  async function createUser() {
      

    await store.addUsuario({name: name.value, email: email.value, password: password.value, eps: eps.value, identification: identificacion.value, tipoUsuario:model.value, state:state.value })
    
    Promise.all([store.getUsuario()]).then(response => rows.value = response[0].data.users)
    
    console.log(rows.value);
    alert.value = false 
  }

    Promise.all([store.getUsuario()]).then(response => rows.value = response[0].data.users)



  const columns = 
    [
      {
        label: 'Nombre',
        align: 'left',
        field: row => row.name, 
        format: val => `${val}`,
        sortable: true,
        
      },
      
      { name: 'email', label: 'Email', field: 'email' },
      { name: 'password', label: 'Contraseña', field: 'password' },
      { name: 'eps', label: 'EPS', field: 'eps' },
      { name: 'identificacion', label: 'Indentificacion', field: 'identification' },
      { name: 'model', label: 'Rol', field: 'typeUser' },
      { name: 'state', field:'state'},
      { name: 'editar', label: 'editar'}

      
    ] 

  function traerDatosAxios() {
    
  }
  function modal(s) {
    let data = JSON.parse(s)
    alert.value=true
    // console.log(s+ ' fsdf');
    // console.log(JSON.parse(s))
    console.log(data);
    name.value=data.name
    identificacion.value=data.identification
    email.value=data.email
    password.value=data.password
    model.value=data.modal
    eps.value=data.eps
  }
    

  
  
  let tipoUsuario = [
    'Super Usuario', 'Administrador', 'Usuario'
  ]
  
  
  let selected = ref([])
  // console.log(selected.value);

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
.botonEditar{
  background-color: #F39A31;
  border-radius: 10px;
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