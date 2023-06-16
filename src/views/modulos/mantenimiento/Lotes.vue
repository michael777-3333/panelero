<template>
    <div v-show="!alert" class="row  justify-center items-center"  style="height: 80vh;">
        <div class="col-10">
          <div v-if="showTable !== false" class="q-ma-xs-md q-ma-lg-sm">
            <q-table :rows="rows" :columns="columns" row-key="_id">
              <template v-slot:top="props">
                <div class="col-6" align="left"><span style="font-size: 25px;">Lotes</span></div>
                <div class="col-6" align="right">
                  <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="abrirModal()"
                     label="Crear Lote"
                  />
                </div>
              </template>
              
              <template v-slot:body-cell-state="props">
                <td>
                  <q-checkbox v-model="props.row.state" color="green" :true-value="1" :false-value="0" @click="editarEstado(props.row)" />
                </td>
              </template>
              
              <template v-slot:body-cell-editar="props">
                <td>
                  <q-btn class="botonEditar" style="background-color:#029127 ;" @click="loteEditar(props.row)"   >
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
    <div v-show="alert" class="row justify-center items-center"  style="height: 80vh;">
      <div class="col-10">
        <div style="height: 6vh; background-color: #029127; color: white; display: flex; font-size: 25px" class="items-center prueba" ><p class="q-my-none q-ml-sm">Lotes</p></div>
        <div class="row justify-center">
          <div class="col-5">
            <div class="buton">
              <q-input filled v-model="name" class="input"  label="Nombre" :dense="dense" />
            </div>
          </div>
          <div class="col-5">
            <div class="buton">
              <q-input filled v-model="size" class="input"  label="Tamaño" :dense="dense" />
            </div>
          </div>
        </div>
                  
        <div class="row justify-center q-mt-lg">
          <div class="col-10">
            <div class="buton">
              <q-select filled v-model="granja" class="input"  label="granja" :options="optionsGranja" />
            </div>
          </div>
        </div>
        
        <div class="row justify-end  q-mt-lg q-mr-xl">
          <div class="col-10" align="end">
            <q-btn @click="createAllotment()" style="bottom: green; color: white;" class="q-mr-xs bg-green" label="Crear Lote" />
            <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />
          </div>
          </div>
        
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { showAlert } from '../../../modules/sweetalert.js';
import { farmService, allotmentService} from "../../../api/";

import { useQuasar } from "quasar";

// const store = useLoteStore();
// const storeGranja = usefincaStore()
// const stateUser = storeToRefs(storeUser);
const $q = useQuasar();
// const hasItToken = $q.cookies.has('token')

let alert = ref(false);
let granja =ref("")
let name = ref("");
let rows = ref([]);
let size = ref("");
let validarEditar = ref(true)
let createdAt = ref();
let data = ref(null)
let optionsGranja=ref([])
let id = ref(null)

let showTable = ref(false);

function vaciarModal() {
  size.value=''
  name.value=''
  granja.value=''

}

async function ordenarLotes() {
  try {

    let res = {}
    
    res.lotes = await allotmentService.getAllotment();
    res.fincas = await farmService.getFarm();

      rows.value = res['lotes'];
      showTable.value = true;

      if (res['lotes'].length === 0) {
        showAlert('No se encontraron registros', 'info')
        console.log("No se encontraron registros");
      }

    // } else if (res['lotes'].status == 403) {
    //   console.log("No existe token");
    //   showAlert("No existe token", 'info')
    // } else {
    //   console.log(res.status);
    // }

    // if (res['farm'].status == 200) {
      if (res['farm'].length === 0) {
        showAlert('No se encontraron registros', 'info')
        console.log("No se encontraron registros");
      } else {
        optionsGranja.value = res['farm'].map((element) => ({
          label: element.name,
          value: element._id
        }));
      }
    // }

  } catch (error) {
    console.log("Error al obtener las peticiones", error);
  }

}
ordenarLotes();

async function editarEstado(props) {
  console.log("hola");
  console.log(props);
  if (props.state == 1) {
    await store.activarLote(props);
  } else if (props.state == 0) {
    await store.desactivarLote(props);
  }
  ordenarLotes();
}

async function createAllotment() {
  if (name.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el tamaño",
    });
  } else if (granja.value == "") {
    $q.notify({
      type: "negative",
      message: "digite la granja ",
    });
  }else if (size.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el tamaño ",
    });
  }else if (createdAt.value == "") {
    $q.notify({
      type: "negative",
      message: "digite la fecha ",
    });
  }
  else if (validarEditar.value == true) {
    await store.addLote({
      size: size.value, name: name.value, farm: granja.value["value"]
    });
    ordenarLotes();
    console.log(rows.value);
    alert.value = false;
    $q.notify({
      type: "positive",
      message: "el lote ha sido creado correctamente",
    });
  }
  else if (validarEditar.value == false) {
    console.log(data.value);
    await store.editLote({
      id: data.value._id,
      name: name.value, 
      size: size.value, 
      farm: granja.value["value"], 
      createdAt: createdAt.value
    });
    ordenarLotes();
    $q.notify({
      type: "positive",
      message: "el lote ha sido actualizado correctamente",
    });
    alert.value = false
    validarEditar.value = true;
  }
}
function loteEditar(info) {
  validarEditar.value = false
  alert.value = true;
  data.value = info
  console.log("e", data.value);
  size.value = data.value.size
  name.value = data.value.name
  granja.value= info.farm.name
  createdAt.value=data.value.createdAt
}
const columns = [
  { name: "state", label: "Estado", align: "center" },
  {
    label: "Nombre",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },

  { name: "size", align: "center", label: "tamaño", field: "size" },
  {
    name: "createdAt",
    align: "center",
    label: "fecha creacion",
    field: "createdAt",
  },
  {
    name: "granja",
    align: "center",
    label: "granja",
    field: (row)=> row.farm,
    format: (val)=>`${val.name}`
  },
  { name: "editar", align: "center", label: "editar" },
];

function abrirModal() {
  alert.value=true
}
function cerrarModal() {
  alert.value=false
  vaciarModal()
  validarEditar.value=true
}
</script>


<style scope>
  .prueba {
    border-radius: 4px;
    
  }
</style>