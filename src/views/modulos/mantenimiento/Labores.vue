<template>
  <!-- DIV ROW CENTRAL -->
  <div class="row justify-center d-flex items-center h-2">
    <!-- DIV COLS RESPONSIVOS -->
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>

    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
      <!-- SECCION SEGUNDA TABLA -->
      <!-- <div v-show="laboresFormr" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">Labores</span>

          <q-btn @click="laboresFormr = !laboresFormr" class="bg-red text-white float-right" label="X" />
  
        </q-card-section>
        <h1 label="Aqui se vera los items de pedios"></h1>

        <q-table title="Treats" :rows="rowss" :columns="columnss" row-key="name" selection="multiple"
          v-model:selected="selected" :filter="filter" grid hide-header>
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''">
              <q-card bordered flat :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''">
                <q-card-section>
                  <q-checkbox dense v-model="props.selected" :label="props.row.element.name" />
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
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
      </div> -->
      <!-- SECCION SEGUNDA TABLA -->


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
                    :options-dense="denseOpts" hint="Separate multiple values by [,;|]"   use-input use-chips 
                    input-debounce="0" style="width: 250px" />
                </div>

                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="activity" label="Actividad" :readonly="readonly" />
                </div>

                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="stateActivity" label="Estao actividad" :readonly="readonly" />
                </div>

                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="workers" :options="optionPersonas" label="Trabajadores" stack-label
                    :dense="dense" :options-dense="denseOpts"  hint="Elegir Trabajadores" use-input use-chips
                     input-debounce="0" style="width: 250px" />
                </div>

                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="elements" :options="optionElementos" label="Inven"  stack-label
                    :dense="dense" multiple :options-dense="denseOpts" hint="Separate multiple values by [,;|]" use-input use-chips
                    input-debounce="0"   style="width: 250px" />
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

      <!-- SECCION PRIMERA TABLA -->
      <div v-if="rows.length > 0" v-show="!laboresForm && !laboresFormr" transition-show="slide-up"
        transition-hide="slide-down" class="q-ma-xs-md q-ma-lg-sm animated zoomIn ">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen pedidos!"
          card-class="bg-white text-black" table-class="text-black-8" table-header-class="text-green" flat bordered
          :visible-columns="visibleColumns" v-model:pagination="pagination">

          <template v-slot:top>
            <div class="col-6 " align="left">
              <span style="font-size: 25px;">Labores</span>
            </div>

            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="newOrder()"
                glossy label="Crear Pedidos" />
            </div>

          </template>


          <template v-slot:body-cell-opciones="props">
            <td>

              <q-btn class="botonEditar q-mx-xs" style="background-color: #029127;" @click="modifyOrder(props.row)">
                <q-icon style="color: white;" name="edit"></q-icon>
              </q-btn>
              <q-btn class="botonEditar">
                <span v-if="props.row.state == 1" @click="inactivedOrder(props.row._id)"><i
                    class="bi bi-toggle-on text-success"></i></span>
                <span v-else><i class="bi bi-toggle-off text-danger" @click="activedOrder(props.row._id)"></i></span>
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
      <!-- ANIMACION DE CARGA -->
    </div>
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
    <!-- DIV COLS RESPONSIVOS -->
  </div>
  <!-- DIV ROW CENTRAL -->
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount } from "vue";
import { showAlert } from '../../../modules/sweetalert.js';
import { inventoryService, peopleService, workService, phaseService } from "../../../api/";

let phase = ref();
let stateActivity = ref()
let activity = ref()
let workers = ref()
let elements = ref()
let optionPersonas = ref([])
let optionElementos = ref([])
let optionsPhase = ref([])

// let optionsDocument = ref(['CC', 'TI', 'CE', 'PS', 'DNI', 'NIT', 'PR', 'PEP', 'PPT']);
let visibleColumns = ref(['actividad', 'elemento', 'etapa', 'estado actividad', 'opciones'])
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 8
  // rowsNumber: xx if getting data from a server
})


let ids = {
  order_id: "",

}


let isAdd = ref(true); // Estoy Añadiendo?
let readonly = ref(false); // hablita la edicion de los inputs
let dense = ref(!true);
let denseOpts = ref(true);
let laboresForm = ref(false);
let laboresFormr = ref(false);
let rows = ref([]);
const columns = [
  {
    name: "id",
    // required: true,
    label: "id",
    // align: "left",
    field: (row) => row._id,
    format: (val) => `${val}`,
    // sortable: true,
    // sortOrder: 'ad', // or 'da'
    required: false
  },

  {
    align: "left",
    field: (row) => row.elements[0],
    format: (val) => `${val.name}`,
    label: "elementos",
    name: "elemento",
    sortable: true,
  },

  {
    align: "left",
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
    align: "left",
    field: (row) => row.stateActivity,
    format: (val) => `${val}`,
    label: "estado de la actividad",
    name: "estado actividad",
    sortable: true,
  },
  {
    name: "opciones",
    align: "center",
    label: "Opciones",
    field: "Opciones"
  },
];

// 2
const columnss = ref([
  { name: 'calories', align: 'center', label: 'Valor', field: 'worth', sortable: true },
  { name: 'fat', label: 'Cantidad', field: 'quantity', sortable: true },

])

const rowss = ref([])
let filter = ref('')
let selected = ref([])

// function clean() {
//   phase.value = activity.value = estado.value = ''
// }

/**
 * Obtiene los pedidos de la api
 */
async function getOrders() {
  try {
    let res = {}

    res['labores'] = await workService.getWork()
    rows.value = res['labores']
    console.log(rows.value, 'd');
    res['persona'] = await peopleService.getPeople()
    res['inventario'] = await inventoryService.getInventory()
    res['etapa'] = await phaseService.getPhase()

   
   
    if (res['labores'].length === 0) {
      showAlert('No se encontraron registros', 'info')
      console.log("No se encontraron registros");
    }

    if (res['inventario'].length === 0) {
      showAlert('No se encontraron registros', 'info')
      console.log("No se encontraron registros");
    } else {
      optionElementos.value = res['inventario'].map((e) => ({
        label: e.name,
        value: e._id
      }))
      console.log(optionElementos.value, 'yy');
    }

    if (res['persona'].length === 0) {
      showAlert('No se encontraron registros', 'info')
      console.log("No se encontraron registros");
    } else {
      optionPersonas.value = res['persona'].map((element) => ({
        label: element.name,
        value: element._id
      }));
    }
    if (res['etapa'].length === 0) {
      showAlert('No se encontraron registros', 'info')
      console.log("No se encontraron registros");
    } else {
      optionsPhase.value = res['etapa'].map((element) => ({
        label: element.name,
        value: element._id
      }));
    }


  } catch (error) {
    console.error("Error al obtener las peticiones", error);
  }

}

function newOrder() {
  laboresForm.value = isAdd.value = true
  // laboresForm.value  = true
  readonly.value = false
}

async function createLabor() {

  console.log(workers.value['value'], 'e');
  // TODO: mostrar cargando en esta parte, Michael encontro un bug aqui si la conecion esta leta creo mas de 6 ordenes con vario click solo añadiendo uno
  laboresForm.value = !laboresForm.value;
  await workService.addWork({
    phase: phase.value["value"],
    stateActivity: stateActivity.value,
    activity: activity.value,
    workers:workers.value['value'],
    elements:[elements.value['value']]

  });
  // console.log(phase.value.value);



  getOrders();
  clean();

}

/**
 * Calcula el área de un rectángulo.
 *
 * @param {number} width - Ancho del rectángulo.
 * @param {number} height - Altura del rectángulo.
 * @returns {number} El área del rectángulo.
 */
function calcularAreaRectangulo(width, height) {
  return width * height;
}

/**
 * Trae al formulario los datos del pedido para se editados
 * @param {object} ObjectOrder - Info del pedido
 */
function modifyOrder(ObjectOrder) {
  laboresForm.value = !laboresForm.value
  isAdd.value = false
  readonly.value = true
  ids["order_id"] = ObjectOrder._id
  estado.value = ObjectOrder.orderStatus
  phase.value = ObjectOrder.customer.name
  activity.value = ObjectOrder.sendAddress
}

async function savedChanges() {
  if (ids) {
    await orderService.editOrder({
      id: ids["order_id"],
      customer: phase.value["value"],
      sendAddress: activity.value,
      orderStatus: estado.value
    });
    ids = {}
    clean()
  }

  getOrders();
  laboresForm.value = !laboresForm.value;
}
/**
 * Desactiva el pedido
 * @param {string} id - id del pedido
 */
async function inactivedOrder(id) {
  await orderService.disabledOrder(id)
  getOrders();
}
/**
 * Activa el pedido
 * @param {string} id - id del pedido
 */
async function activedOrder(id) {
  await orderService.enabledOrder(id)
  getOrders();
}

// TODO: Al des-activar puede ser solo una funcion. igual con ,las demas peticiondes de funciones

// TODO: Agregar funcion computada que actualice el valor de la tabla automaticamnete sin volve a terner que hacer la peticon

// onMounted(() => {
// getDataUsers();
// alert("onmounted")
// getOrders();

// });


// onBeforeMount(() => {
//   // getDataUsers();
//   // alert("onBeforeMount")
//   setTimeout(() => {
//     // btnState.value = false
//     getOrders();
//   }, 1000)

// });

// https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch

onBeforeMount(() => {
  // getDataUsers();
  // alert("onBeforeMount")
  setTimeout(() => {
    // btnState.value = false
    getOrders();
  }, 1000)

});

function showDetailsOrder(ObjectOrder) {
  laboresFormr.value = !laboresFormr.value
  rowss.value = ObjectOrder.products
  console.log(ObjectOrder.products);

}

</script>
  
<!-- /*_*/ -->

<style lang="sass" scoped>
/*_*/
</style>