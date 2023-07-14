<template>
  <!-- tablas -->
  <div v-show="laboresFormr">
    <q-card-section class="bgColorEnfasis">
      <span class="text-black text-h6">Inventario nose</span>

      <q-btn @click="laboresFormr = !laboresFormr" class="bg-red text-white float-right" label="X" />
    </q-card-section>
    <q-table :rows="rowss" :columns="columnss" row-key="name" grid hide-header>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card bordered flat :class="props.selected
            ? $q.dark.isActive
              ? 'bg-grey-9'
              : 'bg-grey-2'
            : ''
            ">
            <q-card-section>
              <!-- <q-checkbox
                    dense
                    v-model="props.selected"
                    :label="props.row.elements.name"
                  /> -->
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(
                (col) => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>

  <div v-show="laboresFormr" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
    <q-card-section class="bgColorEnfasis">
      <span class="text-black text-h6">Trabajadores</span>

      <!-- <q-btn
            @click="laboresFormr = !laboresFormr"
            class="bg-red text-white float-right"
            label="X"
          /> -->
    </q-card-section>
    <h1 label="Aqui se vera los items de pedios"></h1>

    <q-table title="" :rows="rowsTrabajador" :columns="columnsTrabajador" row-key="name" grid hide-header
      style="margin: 0">
      <!-- <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template> -->
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card bordered flat :class="props.selected
            ? $q.dark.isActive
              ? 'bg-grey-9'
              : 'bg-grey-2'
            : ''
            ">
            <q-card-section>
              <!-- <q-checkbox
                    dense
                    v-model="props.selected"
                    :label="props.row.elements.name"
                  /> -->
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(
                (col) => col.name !== 'desc'
              )" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>

  <!-- SECCION FORMULARIO -->
  <div v-show="laboresForm" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
    <q-card-section class="bgColorEnfasis">
      <span class="text-black text-h6">Labores</span>

      <q-btn @click="laboresForm = !laboresForm" class="bg-red text-white float-right" label="X" />
      <!-- <span><br><br></span> -->
    </q-card-section>

    <!-- FORMULARIO -->
    <q-card-section class="bgColorEnfasis q-pt-none">
      <q-card class="d-flex">
        <q-card-section>
          <div class="row">
            <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
              <q-select filled v-model="phase" :options="optionsPhase" label="Etapa" stack-label :dense="dense"
                :options-dense="denseOpts" hint="Separate multiple values by [,;|]" use-input use-chips input-debounce="0"
                style="width: 250px" />
            </div>

            <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
              <q-input v-model="activity" label="Actividad" :readonly="readonly" />
            </div>

            <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
              <q-input v-model="stateActivity" label="Estao actividad" :readonly="readonly" />
            </div>

            <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
              <q-select filled v-model="workers" :options="optionPersonas" label="Trabajadores" multiple stack-label
                :dense="dense" :options-dense="denseOpts" hint="Elegir Trabajadores" use-input use-chips
                input-debounce="0" style="width: 250px" />
            </div>

            <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
              <q-select filled v-model="elements" :options="optionElementos" label="Inven" stack-label :dense="dense"
                multiple :options-dense="denseOpts" hint="Separate multiple values by [,;|]" use-input use-chips
                input-debounce="0" style="width: 250px" />
            </div>
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
      <div align="right" class="q-mt-md">
        <q-btn @click="laboresForm = !laboresForm" class="bg-red text-white q-mx-sm" label="Cerrar" />
        <q-btn class="bg-white">
          <span v-if="isAdd == true" @click="createLabor()">Crear Pedido</span>
          <span v-else @click="savedChanges()">Modificar Pedido</span>
        </q-btn>
      </div>
    </q-card-section>
    <!-- FORMULARIO -->
  </div>
  <!-- SECCION FORMULARIO -->

  <!-- main -->
<div>
  <!--  v-if="rows.length > 0" v-show="!laboresForm && !laboresFormr" -->
    <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen pedidos!"
      card-class="bg-white text-black" table-class="text-black-8" table-header-class="text-green" flat bordered
      :visible-columns="visibleColumns" v-model:pagination="pagination">
      <template v-slot:top>
        <div class="col-6" align="left">
          <span style="font-size: 25px">Labores</span>
        </div>

        <div class="col-6" align="right">
          <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white" @click="newWork()" glossy
            label="Crear Pedidos" />
        </div>
      </template>

      <template v-slot:body-cell-opciones="props">
        <td>
          <q-btn class="botonEditar" style="background-color: #029127" @click="showDetailsWork(props.row)">
            <q-icon style="color: white" name="visibility"></q-icon>
          </q-btn>


          <q-btn class="botonEditar q-mx-xs" style="background-color: #029127" @click="modifyWork(props.row)">
            <q-icon style="color: white" name="edit"></q-icon>
          </q-btn>
          <q-btn class="botonEditar">
            <span v-if="props.row.state == 1" @click="inactivedWork(props.row._id)"><i
                class="bi bi-toggle-on text-success"></i></span>
            <span v-else><i class="bi bi-toggle-off text-danger" @click="activedWork(props.row._id)"></i></span>
          </q-btn>
        </td>
      </template>
    </q-table>
  </div>
  <!-- SECCION PRIMERA TABLA -->
  <!-- ANIMACION DE CARGA -->
  <!-- <div v-else class="q-ma-xs-md q-ma-lg-sm" style="margin-top: 5%">
    <q-linear-progress dark query color="green" class="q-mt-sm" />
    <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" />
  </div> -->
  <!-- ANIMACION DE CARGA -->
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount } from "vue";
import { showAlert } from "../../../modules/sweetalert.js";
import {
  inventoryService,
  peopleService,
  workService,
  phaseService,
} from "../../../api/";

let phase = ref();
let stateActivity = ref();
let activity = ref();
let workers = ref();
let elements = ref();
let optionPersonas = ref([]);
let optionElementos = ref([]);
let optionsPhase = ref([]);

// let optionsDocument = ref(['CC', 'TI', 'CE', 'PS', 'DNI', 'NIT', 'PR', 'PEP', 'PPT']);
let visibleColumns = ref([
  "actividad",
  // "elemento",
  "etapa",
  // "trabajadores",
  "estado actividad",
  "opciones",
]);
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 8,
  // rowsNumber: xx if getting data from a server
});

let ids = {
  order_id: "",
};

let isAdd = ref(true); // Estoy Añadiendo?
let readonly = ref(false); // hablita la edicion de los inputs
let dense = ref(!true);
let denseOpts = ref(true);
let laboresForm = ref(false);
let laboresFormr = ref(false);
let rows = ref([]);
let vectorLabores = ref([]);
let vectorTrabajadores = ref([])
const columns = [
  {
    name: "id",
    // required: true,
    label: "id",
    // align: "left",
    field: (row) => row._id,
    format: (val) => `${val}`,
    // sortable: true,
    // sortWork: 'ad', // or 'da'
    required: false,
  },



  {
    align: "center",
    field: (row) => row.activity,
    format: (val) => `${val}`,
    label: "actividad",
    name: "actividad",
    sortable: true,
  },
  {
    align: "left",
    field: (row) => row.phase,
    format: (val) => `${val.name}`,
    label: "etapa",
    name: "etapa",
    sortable: true,
  },
  {
    align: "center",
    field: (row) => row.stateActivity,
    format: (val) => `${val}`,
    label: "estado de la actividad",
    name: "estado actividad",
    sortable: true,
  },

  // {
  //   align: "center",
  //   field: (row) => row.workers[0],
  //   format: (val) => `${val.name}`,
  //   label: "Trabajadores",
  //   name: "estado actividad",
  //   sortable: true,
  // },
  {
    name: "opciones",
    align: "center",
    label: "Opciones",
    field: "Opciones",
  },
];

// 2
const columnss = ref([
  {
    name: "nombre",
    align: "center",
    label: "Nombre",
    field: "name",
    sortable: true,
  },
  {
    name: "cantidad",
    align: 'center',
    label: "Cantidad",
    field: "quantity"
  },

]);

const columnsTrabajador = ref([

  {
    name: "nombre",
    align: "center",
    label: "Nombre",
    field: "name",
    sortable: true,
  },
  // {
  //   name: "actividad",
  //   align: "center",
  //   label: "Actividad",
  //   field: "activity",
  //   sortable: true,
  // },
  {
    name: "estadoActividad",
    align: "center",
    label: "Estado Actividad",
    sortable: true,
    field: "stateActivity",
    field: (rowss) => rowss,
    format: (val) => {
      if (val) return stateActivitydETAILS
      return ''
    },
  },
])

const rowss = ref([]);
const rowsTrabajador = ref([])

function clean() {
  // phase.value = activity.value = estado.value = ''
}

/**
 * Obtiene los pedidos de la api
 */
async function getWorks() {
  try {

    let labor = await workService.getWork();

    let persona = await peopleService.getPeople();
    let inventario = await inventoryService.getInventory();
    let etapa = await phaseService.getPhase();

    rows.value = labor || [];


    if (inventario.length > 0 && persona.length > 0 && etapa.length > 0) {
      optionPersonas.value = persona.map((element) => ({
        label: element.name,
        value: element._id
      }));

      optionElementos.value = inventario.map((e) => ({
        label: e.name,
        value: e._id,
      }));
      // console.log(optionElementos.value, 'yy');

      optionsPhase.value = etapa.map((element) => ({
        label: element.name,
        value: element._id,
      }));
    }
  } catch (error) {
    console.error("Error al obtener las peticiones", error);
    showAlert('Error al obtener las peticiones', 'error');
  }
}

function newWork() {
  laboresForm.value = isAdd.value = true;
  // laboresForm.value  = true
  readonly.value = false;
}

function destructuracioDatos() {
  vectorLabores.value.push(elements.value);
  vectorTrabajadores.value.push(workers.value)
  let arrayData = [];
  let arrayTrabajadores = [];
  for (let index = 0; index < vectorLabores.value.length; index++) {
    for (let position = 0; position < vectorLabores.value[index].length; position++) {
      arrayData.push(vectorLabores.value[index][position].value);
      // console.log(arrayData, " array");
    }
  }
  for (let index = 0; index < vectorTrabajadores.value.length; index++) {
    for (let position = 0; position < vectorTrabajadores.value[index].length; position++) {
      arrayTrabajadores.push(vectorTrabajadores.value[index][position].value);
      // console.log(vectorTrabajadores, " array");
    }
  }

  return [arrayData, arrayTrabajadores]
}

async function createLabor() {
  // destructuracioDatos()
  const data = destructuracioDatos()

  laboresForm.value = !laboresForm.value;
  await workService.addWork({
    phase: phase.value["value"],
    stateActivity: stateActivity.value,
    activity: activity.value,
    workers: data[1],
    elements: data[0],
  });
  // console.log(phase.value.value);

  // console.log(vectorLabores.value[0], 'ff');
  getWorks();
  clean();
}

/**
 * Trae al formulario los datos del labor para se editados
 * @param {object} ObjectWork - Info del pedido
 */
function modifyWork(ObjectWork) {
  laboresForm.value = !laboresForm.value;
  isAdd.value = false;
  readonly.value = false;
  ids["work_id"] = ObjectWork._id;
  phase.value = ObjectWork.phase['value']
  stateActivity.value = ObjectWork.stateActivity
  activity.value = ObjectWork.activity
  workers.value = []
  elements.value = []
}

async function savedChanges() {
  const data = destructuracioDatos()

  console.log(data[0], 'h')

  if (ids) {
    await workService.editWork({
      id: ids["work_id"],
      phase: phase.value["value"],
      stateActivity: stateActivity.value,
      activity: activity.value,
      workers: data[1],
      elements: data[0],
    });
    ids = {};
    clean();
  }

  getWorks();
  laboresForm.value = !laboresForm.value;
}
/**
 * Desactiva el pedido
 * @param {string} id - id del pedido
 */
async function inactivedWork(id) {
  await workService.disabledWork(id)
  getWorks();
}
/**
 * Activa el pedido
 * @param {string} id - id del pedido
 */
async function activedWork(id) {
  await workService.enabledWork(id)
  getWorks();
}

// TODO: Al des-activar puede ser solo una funcion. igual con ,las demas peticiondes de funciones

// TODO: Agregar funcion computada que actualice el valor de la tabla automaticamnete sin volve a terner que hacer la peticon

// onMounted(() => {
// getDataUsers();
// alert("onmounted")
// getWorks();

// });

// onBeforeMount(() => {
//   // getDataUsers();
//   // alert("onBeforeMount")
//   setTimeout(() => {
//     // btnState.value = false
//     getWorks();
//   }, 1000)

// });

// https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch

onBeforeMount(() => {
  // getDataUsers();
  // alert("onBeforeMount")
  setTimeout(() => {
    // btnState.value = false
    getWorks();
  }, 1000);
});

// function getStateActivity() {
//   re
// }

let stateActivitydETAILS = ''

function showDetailsWork(ObjectWork) {
  laboresFormr.value = !laboresFormr.value;
  rowss.value = ObjectWork.elements;
  rowsTrabajador.value = ObjectWork.workers

  // rowsTrabajador.value.push({activity: ObjectWork.activity}, {stateActivity: ObjectWork.stateActivity}) // console.log(rowss.value);
  // ObjectWork.activity
  // console.log(ObjectWork.workers, ObjectWork.elements);
  console.log(ObjectWork);
  stateActivitydETAILS = ObjectWork.stateActivity

}
</script>

<!-- /*_*/ -->

<style lang="sass" scoped>
/*_*/
</style>
