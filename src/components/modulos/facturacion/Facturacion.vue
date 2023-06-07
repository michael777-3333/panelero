<template>
  <!-- DIV ROW CENTRAL -->
  <div class="row justify-center d-flex items-center h-2">
    <!-- DIV COLS RESPPNSIVOS -->
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>

    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
      <!-- SECCION SEGUNDA TABLA -->
      <div v-show="pedidosFormr" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">Pedidos</span>

          <q-btn @click="pedidosFormr = !pedidosFormr" class="bg-red text-white float-right" label="X" />
          <!-- <span><br><br></span> -->
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
      </div>
      <!-- SECCION SEGUNDA TABLA -->

      <!-- SECCION FORMULARIO -->
      <div v-show="pedidosForm" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">Pedidos</span>

          <q-btn @click="pedidosForm = !pedidosForm" class="bg-red text-white float-right" label="X" />
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
                <!-- <div class="col-1"></div> -->
                <!-- <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                    <q-select filled v-model="tipoDocumentoMFa" :options="optionsDocument" label="Tipo de Documento"
                      stack-label :dense="dense" :options-dense="denseOpts" :readonly="readonly" />
                    <q-input v-model="tipoDocumentoMFa" label="Tipo de Documento" />
                  </div> -->
                <!-- <div class="col-1"></div> -->

                <!-- <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                    <q-input v-model="numeroDocumentoMFa" label="Número de documento" type="number"
                      :readonly="readonly" />
                  </div> -->
                <!-- <div class="col-2"></div>
                <div class="col-1"></div>
                 -->
                <!-- <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                    <q-input v-model="celularMFa" label="Celular" :readonly="readonly" />
                  </div> -->
                <!-- <div class="col-1"></div> -->

                <!--  -->
                <!-- <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                    <q-input v-model="emailMFa" label="Email" :readonly="readonly" />
                  </div> -->
                <!-- <div class="col-2"></div> -->
                <!-- <div class="col-1"></div> -->

                <!-- <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                    <q-input v-model="detalles" label="Descripcion de la panela" :readonly="readonly" />
                  </div> -->
                <!--  -->
                <!-- <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                    <q-input v-model="preferencias" label="Preferencia de la panela" :readonly="readonly" />
                  </div> -->
                <!-- <div class="col-2"></div> -->
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
            <q-btn @click="pedidosForm = !pedidosForm" class="bg-red text-white q-mx-sm" label="Cerrar" />

            <q-btn class="bg-white">
              <span v-if="isAdd == true" @click="createOrder()">Crear Pedido</span>
              <span v-else @click="savedChanges()">Modificar Pedido</span>
            </q-btn>
          </div>
        </q-card-section>
        <!-- FORMULARIO -->
      </div>
      <!-- SECCION FORMULARIO -->

      <!-- SECCION PRIMERA TABLA -->
      <div v-if="rows.length > 0" v-show="!pedidosForm && !pedidosFormr" transition-show="slide-up"
        transition-hide="slide-down" class="q-ma-xs-md q-ma-lg-sm animated zoomIn ">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen pedidos!"
          card-class="bg-white text-black" table-class="text-black-8" table-header-class="text-green" flat bordered
          :visible-columns="visibleColumns" v-model:pagination="pagination">

          <template v-slot:top>
            <div class="col-6 " align="left">
              <span style="font-size: 25px;">Pedidos</span>
            </div>

            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="addOrder()"
                glossy label="Crear Pedidos" />
            </div>

          </template>


          <template v-slot:body-cell-opciones="props">
            <td>
              <q-btn class="botonEditar" style="background-color: #029127;" @click="showDetailsOrder(props.row)">
                <q-icon style="color: white;" name="visibility"></q-icon>
              </q-btn>
              <q-btn class="botonEditar" style="background-color: #029127;" @click="editOrder(props.row)">
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
    <!-- DIV COLS RESPPNSIVOS -->
  </div>
  <!-- DIV ROW CENTRAL -->
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount} from "vue";
import { usePedidoStore, usePersonasStore } from "../../../stores/index.js";
import { showAlert } from '../../../modules/sweetalert.js';
// import { usePedidoStore } from '../../../stores/pedidos.js'
// import { usePersonasStore } from '../../../stores/personasStore'

const personaStore = usePersonasStore()
const pedidoStore = usePedidoStore()

let cliente = ref();
let estado = ref()
let direccionEnvio = ref()
let optionsStatus = ref(['Proceso', 'Entregado', 'Cancelado', 'Realizado']);
let optionsCustomers = ref([])

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
let ids = {
  order_id:"",
  // customer:""
}

// let 

let isAdd = ref(true); // Estoy Añadiendo?
let readonly = ref(false);
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
  cliente.value = direccionEnvio.value = estado.value = ''
}

function addOrder() {
  // pedidosForm.value = isAdd.value = true
  pedidosForm.value  = true
  readonly.value = false
}

async function getOrders() {
  try {
    let res = {}

    res.pedido = await pedidoStore.getPedido()
    res.persona = await personaStore.getPersona()
    // console.log(res.pedido);

    optionsCustomers.value = res["persona"].data.personas.map((element) => ({
      label: element.name,
      value: element._id
    }));

    // console.log(res.data.pedidos);
    if (res['pedido'].status == 200) {
      rows.value = res['pedido'].data
    } else if (res['pedido'].status == 403) {
      console.log("No existe token");
    } else if (res['pedido'].status == 404) {
      console.log("No existen datos");
    } else {
      console.log(res.status);
    }

  } catch (error) {
    console.log("Error al obtener las peticiones", error);
  }

}


async function createOrder() {
  // TODO: mostrar cargando en esta parte, Michael encontro un bug aqui si la conecion esta leta creo mas de 6 ordenes con vario click solo añadiendo uno
  pedidosForm.value = !pedidosForm.value;
  await pedidoStore.addPedido({
    customer:     cliente.value["value"],
    orderStatus:  estado.value,
    sendAddress:  direccionEnvio.value,
    // descriptionOfPanela: detalles.value,
    // documentNumber:      numeroDocumentoMFa.value,
    // documentType:        tipoDocumentoMFa.value,
    // email:               emailMFa.value,
    // phoneNumber:         celularMFa.value,
    // preferencesOfPanela: preferencias.value,
    // quantityOfPanela:    cantidad.value,
  });
  // console.log(cliente.value.value);

  getOrders();
  clean();
 
}

function editOrder(ObjectOrder) {
  // console.log(typeof(ObjectOrder));

  pedidosForm.value = !pedidosForm.value
  isAdd.value = false
  readonly.value = true
  ids["order_id"] =         ObjectOrder._id
  cliente.value =        ObjectOrder.customer.name
  direccionEnvio.value = ObjectOrder.sendAddress
  estado.value =         ObjectOrder.orderStatus
  // ids["customer"] = ObjectOrder.customer._id
  
}

async function savedChanges() {
  if (ids) {
    await pedidoStore.editPedido({
      id: ids["order_id"],
      customer: cliente.value["value"],
      sendAddress: direccionEnvio.value,
      orderStatus: estado.value
    });
    ids = {}
    clean()
  }

  getOrders();
  pedidosForm.value = !pedidosForm.value;
}

async function inactivedOrder(id) {
  await pedidoStore.disabledOrder(id)
  getOrders();
}

async function activedOrder(id) {
  await pedidoStore.enabledOrder(id)
  getOrders();
}

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
  
<!-- /*_*/ -->

<!-- /*_*/ -->
<style lang="sass" scoped>
.grid-style-transition
  transition: transform .28s, background-color .28s
botonEditar
    margin: 10px
</style>