<template>
  <div class="row justify-center items-center h-2">
    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
      <div v-show="costosFormr" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">Costos</span>

          <q-btn @click="costosFormr = !costosFormr" class="bg-red text-white float-right" label="X" />
        </q-card-section>
        <h1 label="Aqui se vera los items de pedios"></h1>

        <q-table title="Treats" :rows="rowsElemets" :columns="columnsProcesos" row-key="name" selection="multiple"
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
      <div v-show="costosForm" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">Costos</span>

          <q-btn @click="costosForm = !costosForm" class="bg-red text-white float-right" label="X" />
          <!-- <span><br><br></span> -->
        </q-card-section>

        <!-- FORMULARIO -->
        <q-card-section class="bgColorEnfasis q-pt-none">
          <q-card class="d-flex">
            <q-card-section>
              <div class="row">


                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="createdAt" label="Fecha creado" :readonly="readonly" />
                </div>

                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select
                    filled
                    v-model="process"
                    :options="optionsProcesos"
                    label="Labores"
                    multiple
                    stack-label
                    :dense="dense"
                    :options-dense="denseOpts"
                    hint="Elegir inventario"
                    use-input
                    use-chips
                    input-debounce="0"
                    style="width: 250px"
                  />
                </div>

                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <!-- <q-input v-model="typeOutlay" label="Valor" :readonly="readonly" /> -->
                  <q-select filled v-model="typeOutlay" label="Tipo de pago"  :options="optionsPago" />

                </div>


                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="updatedAt" label="Fecha entrega" :readonly="readonly" />
                </div>
              </div>
            </q-card-section>
            <q-separator />



          </q-card>
          <!-- </q-card-section>
            <q-card-section> -->
          <div align="right" class="q-mt-md">
            <q-btn @click="costosForm = !costosForm" class="bg-red text-white q-mx-sm" label="Cerrar" />

            <q-btn class="bg-white">
              <span v-if="isAdd == true" @click="createOrder()">Crear Costo</span>
              <span v-else @click="savedChanges()">Modificar Pedido</span>
            </q-btn>
          </div>
        </q-card-section>
        <!-- FORMULARIO -->
      </div>
      <!-- SECCION FORMULARIO -->

      <!-- SECCION PRIMERA TABLA -->
      <div v-if="rows.length != 0" v-show="!costosForm && !costosFormr" transition-show="slide-up"
        transition-hide="slide-down" class="q-ma-xs-md q-ma-lg-sm animated zoomIn ">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen pedidos!"
          card-class="bg-white text-black" table-class="text-black-8" table-header-class="text-green" flat bordered
          :visible-columns="visibleColumns" v-model:pagination="pagination">

          <template v-slot:top>
            <div class="col-6 " align="left">
              <span style="font-size: 25px;">Costos</span>
            </div>

            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="addOrder()"
                glossy label="Crear Costo" />
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
    <!-- DIV COLS RESPONSIVOS -->
  </div>
  <!-- DIV ROW CENTRAL -->
</template>
  
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount } from "vue";
import { costService, paymentTypeService, workService, inventoryService  } from "../../../api/";

import { useCostoStore } from "../../../stores/index.js";
import { showAlert } from '../../../modules/sweetalert.js';
// import { usePedidoStore } from '../../../stores/pedidos.js'
// import { usePersonasStore } from '../../../stores/personasStore'



let createdAt = ref()
let process = ref()
let totalWorth = ref()
let typeOutlay = ref()
let updatedAt = ref()
let optionsPago =ref([])
let data =ref()
let optionsProcesos=ref([])

// let optionsDocument = ref(['CC', 'TI', 'CE', 'PS', 'DNI', 'NIT', 'PR', 'PEP', 'PPT']);
let visibleColumns = ref([
  'fecha creado',
  'proceso',
  'tipo de pago',
  'fecha entrega',
  'total trabajo',
  'opciones'
])
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
  costo_id: "",
  // customer:""
}

// let 
let vectorTrabajadores=ref([])
let vectorElementos=ref([])
let isAdd = ref(true); // Estoy Añadiendo?
let readonly = ref(false); // habilita la edicion de los inputs
let dense = ref(!true);
let denseOpts = ref(true);
let costosForm = ref(false);
let costosFormr = ref(false);
let rows = ref([]);
const columns = [
{
    name: "id",
    label: "id",
    field: (row) => row._id,
    format: (val) => `${val}`,
    required: false
},
{
  name: "fecha creado",
  align: "center", 
  label: "Fecha creado",
  field: (row)=> row.createdAt,
  format: (val)=> `${val}`
},
{
  name: "proceso",
  label: "Proceso",
  align: "center",
  field: (row)=> row.process,
  format: (val)=> `${val.activity}`
},
{ 
    name: "tipo de pago",
    align: "center",
    label: "Tipo de pago", 
    align: "center",
    field: (row)=> row.typeOutlay,
    format: (val)=> `${val.name}` 
},
{ 
    name: "fecha entrega",
    align: "center",
    label: "Fecha de entrega", 
    align: "center",
    field: (row)=> row.updatedAt,
    format: (val)=> `${val}` 
},
{ 
    name: "total trabajo",
    align: "center",
    label: "total trabajo", 
    field: (row)=> row.totalWorth,
    format: (val)=> `${val}` 
},
{
    name: "opciones",
    align: "center",
    label: "Opciones",
    field: "Opciones",
},
  
];

const columnsProcesos=ref([

])


const rowsElemets = ref([])
let filter = ref('')
let selected = ref([])

function clean() {
  cliente.value = direccionEnvio.value = estado.value = ''
}

function addOrder() {
  // costosForm.value = isAdd.value = true
  costosForm.value = true
  readonly.value = false
}

async function getCost() {
  try {
    let res = {}

    res['costo'] = await costService.getCost()
    res['tipoPago'] = await paymentTypeService.getPaymentType()
    res['labores']=await workService.getWork()
    // console.log(res['labores'], 's');
    // if (res['costo'].status == 200) {
      rows.value = res['costo']
      console.log(res['labores'] ,'ll');
      console.log(destructuracioDatos(), 'f');
      console.log( rows.value, 'se');
      optionsPago.value=res['tipoPago'].map((e)=>({
        label: e.name,
        value:e._id
      }))
      console.log(optionsPago.value);
      if (res['costo'].length === 0) {
        // showAlert('No se encontraron registros', 'info')
        console.log("No se encontraron registros");
      }

      if (res['labores'].length===0) {
        showAlert("No se encontraron registros", "info");
        console.log("No se encontraron registros");
      }else{
        optionsProcesos.value=res['labores'].map((e)=>({
          label: e.activity,
          value: e._id
        }))

      // console.log(optionsProcesos.value);
      }

  } catch (error) {
    console.log("Error al obtener las peticiones", error);
  }

}


function destructuracioDatos() {
  for (let index = 0; index < rows.value.length; index++) {
     console.log(rows.value[index].process.elements , 'g');
    vectorElementos.value.push(rows.value[index].process.workers.name) 
  }

 let vetor= rows.value.value.map((e)=>({
    label: e.name,
    value: e._id
  }))
  console.log(vetor , 'vec');
  

}
// console.log(destructuracioDatos());

async function createOrder() {
  // TODO: mostrar cargando en esta parte, Michael encontro un bug aqui si la conecion esta leta creo mas de 6 ordenes con vario click solo añadiendo uno
  costosForm.value = !costosForm.value;
  await costService.addCost({
    createdAt: createdAt.value,
    process: process.value['value'],
    totalWorth: totalWorth.value,
    typeOutlay: typeOutlay.value['value'],
    updatedAt: updatedAt.value
  });
  getCost();
  clean();

}

function editOrder(ObjectOrder) {
  // console.log(typeof(ObjectOrder));

  costosForm.value = !costosForm.value
  isAdd.value = false
  readonly.value = true
  data.value=ObjectOrder

  createdAt.value = data.value.createdAt
  process.value = ObjectOrder.process
  // totalWorth.value = ObjectOrder.orderStatus
  typeOutlay.value= ObjectOrder.typeOutlay
  updatedAt.value= data.value.updatedAt
  // ids["customer"] = ObjectOrder.customer._id

}

async function savedChanges() {
  if (ids) {
    await costService.editCost({
      id: ids["costo_id"],
      createdAt:  createdAt.value,
      process:    process.value,
      updatedAt:  updatedAt.value,
      typeOutlay: typeOutlay.value["value"],

    });
    ids = {}
    clean()
  }

  getCost();
  costosForm.value = !costosForm.value;
}

async function inactivedOrder(id) {
  await pedidoStore.disabledOrder(id)
  getCost();
}

async function activedOrder(id) {
  await pedidoStore.enabledOrder(id)
  getCost();
}


onBeforeMount(() => {
  // getDataUsers();
  // alert("onBeforeMount")
  setTimeout(() => {
    // btnState.value = false
    getCost();
  }, 1000)

});

function showDetailsOrder(ObjectOrder) {
  costosFormr.value = !costosFormr.value
  rowsElemets.value = ObjectOrder.products
  console.log(ObjectOrder.products);

}

</script>
    
  <!-- /*_*/ -->
  
  <!-- /*_*/ -->
<style lang="sass" scoped>
.grid-style-transition
  transition: transform .28s, background-color .28s
.botonEditar
  margin: 10px
</style>