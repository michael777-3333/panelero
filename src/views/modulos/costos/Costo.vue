<template>
  <div class="row justify-center items-center h-2">
    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
      <!-- <div v-if="rows.length != 0" v-show="!costosForm && !costosFormr" transition-show="slide-up"
        transition-hide="slide-down" class="q-ma-xs-md q-ma-lg-sm animated zoomIn "> -->
      <div v-show="costList == false">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen pedidos!"
        card-class="bg-white text-black" table-class="text-black-8" flat bordered
        >
        <!-- :visible-columns="visibleColumns" -->
          <template v-slot:top>
            <div class="col-6 " align="left">
              <span style="font-size: 25px;">Costos</span>
            </div>

            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="addOrder()" glossy label="Crear Costo" />
            </div>

          </template>


          <template v-slot:body-cell-opciones="props">
            <td>
              <q-btn class="botonEditar" style="background-color: #029127;" @click="showList(props.row)">
                <q-icon style="color: white;" name="visibility"></q-icon>
              </q-btn>
              <!-- <q-btn class="botonEditar" style="background-color: #029127;" @click="editOrder(props.row)">
                <q-icon style="color: white;" name="edit"></q-icon>
              </q-btn>
              <q-btn class="botonEditar">
                <span v-if="props.row.state == 1" @click="inactivedOrder(props.row._id)"><i
                    class="bi bi-toggle-on text-success"></i></span>
                <span v-else><i class="bi bi-toggle-off text-danger" @click="activedOrder(props.row._id)"></i></span>
              </q-btn> -->
            </td>

          </template>
        </q-table>
      </div>
      
      <!-- <div v-else class="q-ma-xs-md q-ma-lg-sm" style="margin-top: 5%;">
        <q-linear-progress dark query color="green" class="q-mt-sm" />
        <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" />
      </div> -->
      
        
      
      <div v-show="costList == true">
        <q-card bordered>
          <q-card-section class="bgColorEnfasis" >
            <div style="font-size: 25px; text-align: start; color: white">Lista</div>
          </q-card-section>

          <q-card-section>
            <div class="row">
              <div class="col-3"  v-for="(item, index) in contentList" :key="index">
                <div class="row item-center justify-center">
                  <div class="col-8">
                    <div class="text-center q-pa-sm" v-text="item.element ? item.element.name : item.people.name"></div>
                    <div style="font-size: 12px;" v-text="'Valor: $' + item.worth"></div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn label="Cerrar" @click="costList = !costList" class="bg-red text-white q-mr-md"></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
  
<script setup>

// import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount } from "vue";
  // import { costService, paymentTypeService, workService, inventoryService  } from "../../../api/";
import { costService } from '../../../api/';
import { showAlert } from '../../../modules/sweetalert.js';
import { ref } from 'vue';

// lista de elementos
let costList = ref(false);
let contentList = ref([])

  // let process = ref()
// let typeOutlay = ref()
// let optionsPago =ref([])
// let data =ref()
// let optionsProcesos=ref([])

// let visibleColumns = ref([
//   'fecha creado',
//   'proceso',
//   'tipo de pago',
//   'fecha entrega',
//   'total trabajo',
//   'opciones'
// ])
// const pagination = ref({
//   sortBy: 'desc',
//   descending: false,
//   page: 1,
//   rowsPerPage: 8
//   // rowsNumber: xx if getting data from a server
// })

// const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage))
// console.log(pagesNumber);
// let ids = {
//   costo_id: "",
//   // customer:""
// }

// let vectorTrabajadores=ref([])
// let vectorElementos=ref([])
// let isAdd = ref(true); // Estoy Añadiendo?
// let readonly = ref(false); // habilita la edicion de los inputs
// let dense = ref(!true);
// let denseOpts = ref(true);
let rows = ref([]);
const columns = [
  {
    name: "_id",
    label: "id",
    field: (row) => row._id,
    format: (val) => `${val}`,
    required: false
  },

  {
    name: "createAt",
    label: "Fecha creacion",
    field: (row)=> row.createdAt,
    format: (val)=> `${val}`
  },

  {
    name: "process",
    label: "Proceso",
    field: (row)=> row.process,
    format: (val)=> `${val.activity}`
  },

  { 
    name: "totalWorth",
    label: "Valor total", 
    field: (row)=> row.totalWorth,
    format: (val)=> `${val}` 
  },

  {
    name: "opciones",
    label: "Opciones",
    field: "opciones",
  },
  
];

// const columnsProcesos=ref([

// ])


// const rowsElemets = ref([])
// let filter = ref('')
// let selected = ref([])

// function clean() {
//   cliente.value = direccionEnvio.value = estado.value = ''
// }

// function addOrder() {
//   // costosForm.value = isAdd.value = true
//   costosForm.value = true
//   readonly.value = false
// }

async function getCost() {
  try {
    let res = {}

    res['costo'] = await costService.getCost()
    // res['tipoPago'] = await paymentTypeService.getPaymentType()
    // res['labores']=await workService.getWork()
    rows.value = res['costo']
      // console.log(res['labores'] ,'ll');
      // console.log(destructuracioDatos(), 'f');
    console.log(rows.value);
      // optionsPago.value=res['tipoPago'].map((e)=>({
      //   label: e.name,
      //   value:e._id
      // }))
      // console.log(optionsPago.value);
    if (res['costo'].length === 0) {
      showAlert('No se encontraron registros', 'info')
    }

      // if (res['labores'].length===0) {
      //   showAlert("No se encontraron registros", "info");
      //   console.log("No se encontraron registros");
      // }else{
      //   optionsProcesos.value=res['labores'].map((e)=>({
      //     label: e.activity,
      //     value: e._id
      //   }))

      // console.log(optionsProcesos.value);
      // }

  } catch (error) {
    console.log("Error al obtener las peticiones", error);
  }

}

document.addEventListener('DOMContentLoaded', () => { getCost(); })

// function destructuracioDatos() {
//   for (let index = 0; index < rows.value.length; index++) {
//      console.log(rows.value[index].process.elements , 'g');
//     vectorElementos.value.push(rows.value[index].process.workers.name) 
//   }

//  let vetor= rows.value.value.map((e)=>({
//     label: e.name,
//     value: e._id
//   }))
//   console.log(vetor , 'vec');
  

// }
// console.log(destructuracioDatos());

// async function createOrder() {
//   // TODO: mostrar cargando en esta parte, Michael encontro un bug aqui si la conecion esta leta creo mas de 6 ordenes con vario click solo añadiendo uno
//   costosForm.value = !costosForm.value;
//   await costService.addCost({
//     createdAt: createdAt.value,
//     process: process.value['value'],
//     totalWorth: totalWorth.value,
//     typeOutlay: typeOutlay.value['value'],
//     updatedAt: updatedAt.value
//   });
//   getCost();
//   clean();

// }

// function editOrder(ObjectOrder) {
//   // console.log(typeof(ObjectOrder));

//   costosForm.value = !costosForm.value
//   isAdd.value = false
//   readonly.value = true
//   data.value=ObjectOrder

//   createdAt.value = data.value.createdAt
//   process.value = ObjectOrder.process
//   // totalWorth.value = ObjectOrder.orderStatus
//   typeOutlay.value= ObjectOrder.typeOutlay
//   updatedAt.value= data.value.updatedAt
//   // ids["customer"] = ObjectOrder.customer._id

// }

// async function savedChanges() {
//   if (ids) {
//     await costService.editCost({
//       id: ids["costo_id"],
//       createdAt:  createdAt.value,
//       process:    process.value,
//       updatedAt:  updatedAt.value,
//       typeOutlay: typeOutlay.value["value"],

//     });
//     ids = {}
//     clean()
//   }

//   getCost();
//   costosForm.value = !costosForm.value;
// }

// async function inactivedOrder(id) {
//   await pedidoStore.disabledOrder(id)
//   getCost();
// }

// async function activedOrder(id) {
//   await pedidoStore.enabledOrder(id)
//   getCost();
// }


// onBeforeMount(() => {
//   // getDataUsers();
//   // alert("onBeforeMount")
//   setTimeout(() => {
//     // btnState.value = false
//     getCost();
//   }, 1000)

// });

function showList(row) {
  costList.value = !costList.value;
  
  contentList.value = row.list;

  console.log(contentList.value);
}

</script>

<!-- <style lang="sass" scoped>
.grid-style-transition
  transition: transform .28s, background-color .28s
.botonEditar
  margin: 10px
</style> -->