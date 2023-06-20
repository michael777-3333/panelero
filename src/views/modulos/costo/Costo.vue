<template>
  <div class="row justify-center items-center h-2">
    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
      <!-- <div v-if="rows.length != 0" v-show="!costosForm && !costosFormr" transition-show="slide-up"
        transition-hide="slide-down" class="q-ma-xs-md q-ma-lg-sm animated zoomIn "> -->
      <div v-show="costList == false && costForm == false">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen costos!"
        card-class="bg-white text-black" table-class="text-black-8" flat bordered :visible-columns="visibleColumns"
        >
          <template v-slot:top>
            <div class="col-6 " align="left">
              <span style="font-size: 25px;">Costos</span>
            </div>

            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="showForm()" glossy label="Crear Costo" />
            </div>

          </template>


          <template v-slot:body-cell-opciones="props">
            <td>
              <q-btn class="botonEditar" style="background-color: #029127;" @click="showList(props.row)">
                <q-icon style="color: white;" name="visibility"></q-icon>
              </q-btn>
              <!-- <q-btn class="botonEditar" style="background-color: #029127;" @click="editOrder(props.row)">
                <q-icon style="color: white;" name="edit"></q-icon>
              </q-btn> -->
              <q-btn class="botonEditar q-ml-xs">
                <span v-if="props.row.state == 1">
                  <i class="bi bi-toggle-on text-success" @click="desactivateCost(props.row._id)"></i>
                </span>
                <span v-else>
                  <i class="bi bi-toggle-off text-danger" @click="activateCost(props.row._id)"></i>
                </span>
              </q-btn>
            </td>

          </template>
        </q-table>
      </div>
      
      <!-- <div v-else class="q-ma-xs-md q-ma-lg-sm" style="margin-top: 5%;">
        <q-linear-progress dark query color="green" class="q-mt-sm" />
        <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" />
      </div> -->
      
        
        <!-- lista -->
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
                    <div v-text="'Tipo gasto: ' + item.typeOutlay.name" style="font-size: 12px"></div>
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

        <!-- formulario -->
      <div v-show="costForm">
        <q-card>
	        <q-card-section class="bgColorEnfasis" align="left">
            <span class="text-white" style="font-size: 25px;">Costos</span>
          </q-card-section>
	        
          <q-card-section>
            <div class="row">
              <div class="col-xs-6 col-md-6 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                <q-select
                  filled
                  v-model="process"
                  :options="optionsProcess"
                  label="Labor"
                />
              </div>

              <div class="col-xs-6 col-md-6 justify-center  q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                <q-btn @click="openDialog()" label="Lista"/>
              </div>
            </div>
          </q-card-section>
          
          <q-separator />

          <q-card-actions align="right" class="q-mr-md">
            <q-btn @click="costForm = !costForm" class="bg-red text-white q-mx-sm" label="Cerrar" />

            <q-btn class="bg-white text-black" @click="saveCost()">
              <span>Crear Costo</span>
            </q-btn>
          </q-card-actions>	
        </q-card>
          <!-- formulario dialog -->
        <q-dialog v-model="showDialog">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="bgColorEnfasis text-white">
              <span class="text-white" style="font-size: 25px;">Lista</span>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-6">
                  <q-select filled :disable="element !== null" v-model="people" label="Persona"  :options="optionsPeople">
                    <template v-slot:append>
                      <q-icon
                        v-if="people !== null"
                        class="cursor-pointer"
                        name="clear"
                        @click.stop.prevent="people = null"
                      />
                    </template>
                  </q-select>
                </div>
                <div class="col-6">
                  <q-select filled :disable="people !== null" v-model="element" label="Elemento"  :options="optionsElement">
                    <template v-slot:append>
                      <q-icon
                        v-if="element !== null"
                        class="cursor-pointer"
                        name="clear"
                        @click.stop.prevent="element = null"
                      />
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
			            <q-select filled v-model="typeOutlay" label="Tipo Gasto"  :options="optionsOutlay" />
                </div>
                <div class="col-6">
                  <q-input filled v-model.number="worth" type="number" label="Valor"/>
                </div>
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="right">
              <q-btn label="Cerrar" class="bg-red text-white" @click="showDialog = !showDialog" />
              <q-btn label="Guardar" class="bg-white text-black q-mx-sm" @click="addElement()" />
            </q-card-actions>

            <q-separator />
            <q-card-section>
              <div class="row" v-if="currentList.length > 0">
                <div class="col-3" v-for="(item, index) in currentList" :key="index">
                  <div class="row justify-center">
                    <div class="col-8">
                      <div class="text-center q-pa-sm" v-text="item.element ? item.element.label : item.people.label"></div>
                      <div class="tex-center" v-text="'Tipo gasto: ' + item.typeOutlay.label" style="font-size: 12px"></div>
                      <div class="text-center" style="font-size: 12px;" v-text="'Valor: $' + item.worth"></div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>
  
<script setup>
// TODO: store paymentTypeService deberia ser outlayService !!tipo gasto es diferente a metodo pago 'payment'
import { costService, workService, outlayService } from '../../../api/';
import { showAlert } from '../../../modules/sweetalert.js';
import { ref } from 'vue';

// lista
let costList = ref(false);
let contentList = ref([]);

function showList(row) {
  costList.value = !costList.value;
  
  contentList.value = row.list;

  console.log(contentList.value);
}

// formulario
let costForm = ref(false);
let process = ref('');
  // select options
let optionsProcess = ref([]);
// list
let showDialog = ref(false);
let people = ref(null);
let element = ref(null);
let worth = ref(0);
let typeOutlay = ref('');
let currentList = ref([]);
  // select options
let optionsPeople = ref([]);
let optionsElement = ref([]);
let optionsOutlay = ref([]);

function showForm() {
  costForm.value = true
}

// form save cost
async function saveCost() {
  if (process.value == '') {
    showAlert('Por favor selecciona una Labor');
  } else if (currentList.value.length == 0) {
    showAlert('Por favor agrega una o varias Listas')
  } else {
    console.log(process.value['value'], !currentList.value[0].element)

    let listTemp = []

    for (let position = 0; position < currentList.value.length; position++) {
      listTemp.push({element: !currentList.value[position].element ? null : currentList.value[position].element['value'], people: !currentList.value[position].people ? null : currentList.value[position].people['value'], worth: currentList.value[position].worth, typeOutlay: currentList.value[position].typeOutlay['value']});
    }

    console.log(listTemp);

    const data = await costService.addCost({process: process.value['value'], list: listTemp});

    cleanForm();

    showAlert('nuevo Costo creado', 'success');

    await getCost();

    costForm.value = !costForm.value;
  }
}

function cleanForm() {
  currentList.value = [];
  process.value = '';
}

function openDialog() {
  if (process.value == '') {
    showAlert('Por favor selecciona una Labor');
  } else {
    // console.log(process.value);
    // select options
      // people
    optionsPeople.value = process.value['workers'].map((element)=>({
      label: element.name,
      value: element._id
    }));
      // elements
    optionsElement.value = process.value['elements'].map((element)=>({
      label: element.name,
      value: element._id
    }));

    showDialog.value = !showDialog.value;
  }
}

// dialog form
function addElement() {
  // TODO: problema el dialog se posiciona encima de las alert
  if (!element.value && !people.value) {
    showDialog.value = !showDialog;
    showAlert('Por favor seleccione una persona o un elemento', 'error');
  } else if (worth.value <= 0) {
    showAlert('Ingrese un Valor mayor a 0', 'error');
  } else if (typeOutlay == '') {
    showAlert('Por favor seleccione un Tipo Gasto', 'error');
  } else {
    currentList.value.push({element: element.value, people: people.value, worth: worth.value, typeOutlay: typeOutlay.value});
    // console.log(currentList.value);
  }

  cleanDialog();
}

function cleanDialog() {
  element.value = null;
  people.value = null;
  worth.value = 0;
  typeOutlay.value = '';
}

// tabla principal
let visibleColumns = ref([
  'process',
  'totalWorth',
  'opciones',
]);

let rows = ref([]);

const columns = [
  {
    name: "_id",
    label: "id",
    field: (row) => row._id,
    format: (val) => `${val}`
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
    align: 'left',
    field: (row)=> row.process,
    format: (val)=> `${val.activity}`
  },

  { 
    name: "totalWorth",
    label: "Valor total",
    align: 'left', 
    field: (row)=> row.totalWorth,
    format: (val)=> `${val}` 
  },

  {
    name: "opciones",
    label: "Opciones",
    align: 'center',
    field: "opciones",
  },
  
];

async function getCost() {
  try {
    let res = {};

    res['costo'] = await costService.getCost();
    res['labores'] = await workService.getWork();
    res['outlay'] = await outlayService.getOutlay();
    rows.value = res['costo'];
    console.log(rows.value);
    if (res['costo'].length === 0) {
      showAlert('No se encontraron registros', 'info')
    }
    // select options
      // form
    optionsProcess.value = res['labores'].map((element)=>({
      label: element.activity,
      value: element._id,
      workers: element.workers,
      elements: element.elements
    }));

      //dialog
    optionsOutlay.value = res['outlay'].map((element) => ({
      label: element.name,
      value: element._id
    }))
  } catch (error) {
    console.log("Error al obtener las peticiones", error);
  }
}

async function desactivateCost(id) {
  await costService.disabledCost(id);
  getCost();
}

async function activateCost(id) {
  await costService.enabledCost(id);
  getCost();
}

document.addEventListener('DOMContentLoaded', () => { getCost(); })


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

// onBeforeMount(() => {
//   // getDataUsers();
//   // alert("onBeforeMount")
//   setTimeout(() => {
//     // btnState.value = false
//     getCost();
//   }, 1000)

// });
</script>