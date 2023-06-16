<template>
  <!-- DIV ROW CENTRAL -->
  <div class="row justify-center items-center d-flex h-2">
    <!-- DIV COLS RESPONSIVOS -->
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>

    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">


      <!-- SECCION FORMULARIO -->
      <div v-show="fincaForm" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">fincas</span>

          <q-btn @click="fincaForm = !fincaForm" class="bg-red text-white float-right" label="X" />
          <!-- <span><br><br></span> -->
        </q-card-section>

        <!-- FORMULARIO -->
        <q-card-section class="bgColorEnfasis q-pt-none">
          <q-card class="d-flex">
            <q-card-section>
              <div class="row" style="margin-left: 23%;">

                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="name" label="Nombre" :readonly="readonly" />

                </div>
                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="ownerFarm" label="Dueño" :readonly="readonly" />
                </div>
              </div>
            </q-card-section>
            <q-separator />
          </q-card>
          <div align="right" class="q-mt-md">
            <q-btn @click="fincaForm = !fincaForm" class="bg-red text-white q-mx-sm" label="Cerrar" />

            <q-btn class="bg-white">
              <span v-if="isAdd == true" @click="createFinca()">Crear Finca</span>
              <span v-else @click="savedChanges()">Guardar</span>
            </q-btn>
          </div>
        </q-card-section>
        <!-- FORMULARIO -->
      </div>
      <!-- SECCION FORMULARIO -->

      <!-- SECCION PRIMERA TABLA -->
      <div v-if="rows.length > 0" v-show="!fincaForm && !fincaFormr" transition-show="slide-up"
        transition-hide="slide-down" class="q-ma-xs-md q-ma-lg-sm animated zoomIn ">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen fincas!"
          card-class="bg-white text-black" table-class="text-black-8" table-header-class="text-green" flat bordered
          :visible-columns="visibleColumns" v-model:pagination="pagination">
          <template v-slot:body-cell-state="props">
            <td>
              <q-checkbox v-model="props.row.state" color="green" :true-value="1" :false-value="0"
                @click="editarFinca(props.row)" />
            </td>
          </template>

          <template v-slot:top>
            <div class="col-6 " align="left">
              <span style="font-size: 25px;">Fincas</span>
            </div>

            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="addFinca()"
                glossy label="Crear finca" />
            </div>
          </template>
          <template v-slot:body-cell-opciones="props">
            <td>
              <q-btn class="botonEditar" style="background-color: #029127;" @click="editFinca(props.row)" glossy>
                <q-icon style="color: white;" name="edit"></q-icon>
              </q-btn>
            </td>
          </template>
        </q-table>
      </div>
      <!-- SECCION PRIMERA TABLA -->
      <!-- ANIMACION DE CARGA -->
      <div v-else class="q-ma-xs-md q-ma-lg-sm" style="margin-top: 5%;">
        <q-linear-progress dark query color="green" class="q-mt-sm" />
        <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" />
      </div>

    </div>
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
    <q-dialog v-model="alert" persistent>
      <q-card class="dialogMarca" style="width: 400px ; height: 270px;">
        <q-card-section class="cardMarcas">
          <div style="color:  white" class="text-h6">Marca</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="marcasCard d-flex">
            <q-card-section>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-5">
                  <div class="buton">

                    <q-input filled v-model="name" class="input" label="Nombre" :dense="dense" />
                  </div>
                  <!-- <q-input v-model="name" label="Nombre" :dense="dense" :readonly="readonly" /> -->
                </div>


                <div class="col-5">
                  <div class="buton">
                    <q-input filled v-model="ownerFarm" class="input" label="dueño" :dense="dense" />

                  </div>
                  <!-- <q-input v-model="ownerCompany" label="proveedor" :readonly="readonly" /> -->
                </div>
                <!--  -->
                <!-- <div class="col-5">
                  <q-input v-model="createdAt" label="Fecha de compra" type="date" :readonly="readonly" />
                </div> -->



              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="center">
              <q-btn @click="createFinca()" style="background-color: green; color: white; "
                sclass="q-my-md colorEnfasis">Crear Marca</q-btn>
              <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />

            </q-card-actions>

          </q-card>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { usefincaStore, usePersonasStore } from "../../../stores/index.js";
import { showAlert } from '../../../modules/sweetalert.js';
import { farmService } from "../../../api/";

const store = usefincaStore()
// const storePersonas = usePersonasStore()

let name = ref("");
let ownerFarm = ref("");
let validarEditar = ref(true)
let data = ref(null)
let alert = ref(false);
let visibleColumns = ref(['state', 'nombre', 'dueno ', 'opciones'])
let id = null;
let rows = ref([]);

let isAdd = ref(true); // Estoy Añadiendo?
let readonly = ref(false); // hablita la edicion de los inputs
let dense = ref(!true);

let fincaFormr = ref(false);
let fincaForm = ref(false);

const columns = [
  { name: "state", label: "Estado", field: "state", align: "left" },
  {
    name: "id",
    label: "id",
    field: (row) => row.name,
    format: (val) => `${val}`,
    required: false
  },
  { name: "nombre", align: "left", label: "nombre", field: "name", sortable: true, },
  { name: "dueno ", label: "dueño finca", field: (row) => row.ownerFarm, format: (val) => `${val.name}`, },
  { name: "opciones", align: "center", label: "Editar", field: "Editar" },
];

const rowss = ref([])


function addFinca() {
  // pedidosForm.value = isAdd.value = true
  fincaForm.value = true
  readonly.value = false
}

async function ordenarfinca() {
  try {
    let res = {}

    res['farm'] = await farmService.getFarm()

    rows.value = res['farm']
    if (res['farma'].length === 0) {
      showAlert('No se encontraron registros', 'info')
      console.log("No se encontraron registros");
    }

  } catch (error) {
    console.error("Error al obtener las peticiones", error);
  }

}

function closeModal() { // Cierro el modal
  function limpiarCajas() { // Vacio los formularios
    name.value = roles.value = password.value = ''
  }
  id = null
  getUsers(); // Actualizo la tabla
  limpiarCajas()
  modalUser.value = false // Cierro el modal
  isAdd.value = false
}
function editFinca(data) {
  // console.log(a);
  fincaForm.value = true;
  isAdd.value = false
  id = data._id
  name.value = data.name
  ownerFarm.value = data.ownerFarm.name

}

async function savedChanges() {
  let data = {
    name: name.value,
    ownerFarm: ownerFarm.value
  }
  if (validations() && isAdd.value) {
    data['password'] = password.value
    // fctn de la peticion para crear usuario
    await userService.addUser({ data });

  } else if (validations() && !isAdd.value && id != null) {
    data['id'] = id.value
    // fctn de la peticion para editar usuario
    // console.log(roles.value);
    await userService.editUser({ data });

  }

  closeModal()
}

async function createFinca() {
  if (name.value == '') {
    showAlert("digite el nombre")
  } else if (validarEditar.value == true) {
    await store.addfinca(
      {
        name: name.value,
  
      })
    ordenarfinca()
    alert.value = false
    showAlert("la finca ha sido agregada correctamente", 'success')

    validarEditar.value = true
  } else if (validarEditar.value == false) {
    await farmService.editFarm(
      {
        id: data.value._id,
        name: name.value,
        dueno: dueno.value,
        // ownerFarm: ownerFarm.value,

      })
    showAlert("la finca ha sido actualizado correctamente", 'success')

    alert.value = false
    validarEditar.value = true;
    ordenarfinca()
  }
 
}


function cerrarModal() {
  console.log(validarEditar.value);
  alert.value = false
  validarEditar.value = true
  console.log(validarEditar.value);
}

onBeforeMount(() => {

  setTimeout(() => {

    ordenarfinca()

  }, 1000)

});

function showDetailsOrder(ObjectOrder) {
  fincaFormr.value = !fincaFormr.value
  rowss.value = ObjectOrder.products
  console.log(ObjectOrder.products);

}
</script>

<style scoped>/*_*/</style>