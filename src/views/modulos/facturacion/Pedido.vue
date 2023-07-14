<template>
  <!-- DIV ROW CENTRAL -->
  <div class="row justify-center d-flex items-center h-2">
    <!-- DIV COLS RESPONSIVOS -->
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>

    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
      <!-- SECCION SEGUNDA TABLA -->
      <div v-show="pedidosFormr" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">Pedidos</span>

          <q-btn @click="pedidosFormr = !pedidosFormr" class="bg-red text-white float-right" label="X" />
          <!-- <span><br><br></span> -->
        </q-card-section>
        <h1 label="Aqui se verá los items de pedios"></h1>

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
      </div>
      <!-- SECCION SEGUNDA TABLA -->

      <!-- SECCION FORMULARIO -->
      <div v-show="pedidosForm" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">Pedidos</span>

          <q-btn @click="clean()" class="bg-red text-white float-right" label="X" />
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
                  <q-select filled v-model="cliente" :options="optionsCustomers" label="Cliente" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                
                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="estado" :options="optionsStatus" label="Estado del pedido" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                <!--  -->
                <!-- <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                    <q-input v-model="cantidad" label="Cantidad de panela" type="number" :readonly="readonly" />
                  </div> -->
                <!-- <div class="col-2"></div> -->
                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="direccionEnvio" label="Dirección de envio" :readonly="readonly" />
                </div>
              </div>
            </q-card-section>
            <q-separator />



          </q-card>
          <!-- </q-card-section>
          <q-card-section> -->
          <div align="right" class="q-mt-md">
            <q-btn @click="clean()" class="bg-red text-white q-mx-sm" label="Cerrar" />

            <q-btn class="bg-white">
              <span v-if="isAdd == true" @click="savedChanges()">Crear Pedido</span>
              <span v-else @click="savedChanges()">Modificar Pedido</span>
            </q-btn>
          </div>
        </q-card-section>
        <!-- FORMULARIO -->
      </div>
      <!-- SECCION FORMULARIO -->

      <!-- SECCION PRIMERA TABLA -->
      <div v-if="showLoader" v-show="!pedidosForm && !pedidosFormr" transition-show="slide-up"
        transition-hide="slide-down" class="q-ma-xs-md q-ma-lg-sm animated zoomIn ">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen pedidos!"
          card-class="bg-white text-black" table-class="text-black-8" table-header-class="text-green" flat bordered
          :visible-columns="visibleColumns" v-model:pagination="pagination">

          <template v-slot:top>
            <div class="col-6 " align="left">
              <span style="font-size: 25px;">Pedidos</span>
            </div>

            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="newOrder()"
                glossy label="Crear Pedidos" />
            </div>

          </template>


          <template v-slot:body-cell-opciones="props">
            <td>
              <q-btn class="botonEditar" style="background-color: #029127;" @click="showDetailsOrder(props.row)">
                <q-icon style="color: white;" name="visibility"></q-icon>
              </q-btn>
              <q-btn class="botonEditar q-mx-xs" style="background-color: #029127;" @click="modifyOrder(props.row)">
                <q-icon style="color: white;" name="edit"></q-icon>
              </q-btn>
              <q-btn class="botonEditar">
                <span v-if="props.row.state == 1" @click="changeStatus(props.row._id, props.row.state)"><i
                    class="bi bi-toggle-on text-success"></i></span>
                <span v-else><i class="bi bi-toggle-off text-danger" @click="changeStatus(props.row._id, props.row.state)"></i></span>
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
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount} from "vue";
import { showAlert } from '../../../modules/sweetalert.js';
import { orderService, peopleService } from "../../../api/";

let cliente = ref();
let estado = ref()
let direccionEnvio = ref()
let optionsStatus = ref(['Proceso', 'Entregado', 'Cancelado', 'Realizado']);
let optionsCustomers = ref([])

let showLoader = ref(false)

// let optionsDocument = ref(['CC', 'TI', 'CE', 'PS', 'DNI', 'NIT', 'PR', 'PEP', 'PPT']);
let visibleColumns = ref(['nombre', 'cantidad', 'estado', 'opciones'])
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 8
  // rowsNumber: xx if getting data from a server
})

// const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage))
// console.log(pagesNumber);
let ids = {order_id:"",}


let isAdd = ref(true); // Estoy Añadiendo?
let readonly = ref(false); // hablita la edicion de los inputs
let dense = ref(!true);
let denseOpts = ref(true);
let pedidosForm = ref(false);
let pedidosFormr = ref(false);
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
    field: (row) => row.customer,
    format: (val) => `${val.name}`,
    label: "Cliente",
    name: "nombre",
    sortable: true,
  },
  { name: "cantidad", label: "Direccion", field: "sendAddress" },
  { name: "estado", label: "Estado", field: "orderStatus", sortable: true, },
  { name: "opciones", align: "center", label: "Opciones", field: "Opciones" },
];

// 2
const columnss = ref([
  { name: 'calories', align: 'center', label: 'Valor', field: 'worth', sortable: true },
  { name: 'fat', label: 'Cantidad', field: 'quantity', sortable: true },
//   { name: 'fat', label: 'Fat (g)', field: (row) => row.element
// , format: (val) => `${val.name}`, sortable: true },

  // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  // { name: 'protein', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
])

const rowss = ref([])
let filter= ref('')
let selected= ref([])

function clean() {
  pedidosForm.value = !pedidosForm.value;
  isAdd.value          = false
  cliente.value = direccionEnvio.value = estado.value = ''
}

/**
 * Obtiene los pedidos de la api
 */
async function getOrders() {
  try {

    let pedido = await orderService.getOrder()
    let persona = await peopleService.getPeople()
    showLoader.value = true

    rows.value = pedido || [];

    if (persona.length > 0) {
      optionsCustomers.value = persona.map((element) => ({
        label: element.name,
        value: element._id
      }));
    }

  } catch (error) {
    console.error("Error al obtener las peticiones", error);
    showAlert('Error al obtener las peticiones', 'error');
  }
}

function newOrder() {
  pedidosForm.value = isAdd.value = true
  // pedidosForm.value  = true
  isAdd.value    = true
  readonly.value = false
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
  pedidosForm.value    = !pedidosForm.value
  isAdd.value          = false
  readonly.value       = true
  ids["order_id"]      = ObjectOrder._id
  estado.value         = ObjectOrder.orderStatus
  cliente.value        = ObjectOrder.customer.name
  direccionEnvio.value = ObjectOrder.sendAddress
}

async function savedChanges() {
  if (validations()) {

    let data = {
      id: ids["order_id"],
      customer: cliente.value["value"],
      sendAddress: direccionEnvio.value,
      orderStatus: estado.value,
    }

    // TODO: mostrar cargando en esta parte, Michael encontro un bug aqui si la conecion esta leta creo mas de 6 ordenes con vario click solo añadiendo uno
    if (isAdd.value) {
      await orderService.addOrder(data);
    } else if (!isAdd.value) {
      await orderService.editOrder(data);
      ids["order_id"] = ''
    }

    getOrders();
    clean()
  }

}

/**
 * Validaciones
 *
 * @returns {bool} true, si todo es valido.
 */
function validations() {
  if (cliente.value == undefined || cliente.value == '') {
    showAlert('Selecione el cliente')
  } else if (estado.value == undefined || estado.value == '') {
    showAlert('Selecione el estado')
  } else if (direccionEnvio.value == undefined || direccionEnvio.value.trim() == '') {
    showAlert('Digite la direccion de envio')
  } else { return true }
}

/**
 * Cambia el estado.
 *
 * @param {string} id - id del pedido.
 * @param {string} status - Estado del pedido (0 or 1).
 */
async function changeStatus(id, status) {
  if (status && typeof (status) == 'number' && status == 1) { // Desactiva el pedido 
    await orderService.disabledOrder(id)
  } else if (typeof (status) == 'number' && status == 0) { //Activa el pedido
    await orderService.enabledOrder(id)
  }
  getOrders()
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
  pedidosFormr.value = !pedidosFormr.value
  rowss.value = ObjectOrder.products
  console.log(ObjectOrder.products);

}

</script>

<style lang="sass" scoped>
/*_*/
</style>