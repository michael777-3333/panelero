<template>

  <div class="row justify-center d-flex items-center h-2">

    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>

    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">

      <!-- SECCION SEGUNDA TABLA -->
      <div v-show="InventoriFormr" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">Pedidos</span>

          <q-btn @click="InventoriFormr = !InventoriFormr" class="bg-red text-white float-right" label="X" />
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

      <!-- SECCION FORMULARIO -->
      <div v-show="InventoriForm" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6"> Costo Inventario</span>

          <q-btn @click="InventoriForm = !InventoriForm" class="bg-red text-white float-right" label="X" />
          <!-- <span><br><br></span> -->
        </q-card-section>

        <!-- FORMULARIO -->
        <q-card-section class="bgColorEnfasis q-pt-none">
          <q-card class="d-flex">
            <q-card-section>
              <div class="row">


                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="name" :options="optionsCustomers" label="Nombre" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                
                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="code" :options="optionsStatus" label="Codigo" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="quantity" :options="optionsStatus" label="Cantidad" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="costs" :options="optionsStatus" label="Costo" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="detail" :options="optionsStatus" label="Detalle" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-select filled v-model="date" :options="optionsStatus" label="Fecha" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
              
                <!-- <div class="col-xs-6 col-md-4 q-pa-xs-sm q-px-sm-md q-px-sm-lg">
                  <q-input v-model="direccionEnvio" label="Dirección de envio" :readonly="readonly" />
                </div> -->
              </div>
            </q-card-section>
            <q-separator />

          </q-card>

          <div align="right" class="q-mt-md">
            <q-btn @click="InventoriForm = !InventoriForm" class="bg-red text-white q-mx-sm" label="Cerrar" />

            <q-btn class="bg-white">
              <span v-if="isAdd == true" @click="createOrder()">Crear Cobro</span>
              <span v-else @click="savedChanges()">Modificar Cobro</span>
            </q-btn>
          </div>
        </q-card-section>
        <!-- FORMULARIO -->
      </div>

      <div v-if="rows.length > 0" v-show="!InventoriForm && !InventoriFormr" transition-show="slide-up"
        transition-hide="slide-down" class="q-ma-xs-md q-ma-lg-sm animated zoomIn ">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen cobros!"
          card-class="bg-white text-black" table-class="text-black-8" table-header-class="text-green" flat bordered
          :visible-columns="visibleColumns" v-model:pagination="pagination">

          <template v-slot:top>
            <div class="col-6 " align="left">
              <span style="font-size: 25px;">Inventario</span>
            </div>

            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="addOrder()"
                glossy label="Crear Cobro" />
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

      <!-- ANIMACION DE CARGA -->
      <div v-else class="q-ma-xs-md q-ma-lg-sm" style="margin-top: 5%;">
        <q-linear-progress dark query color="green" class="q-mt-sm" />
        <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" />
      </div>
      <!-- ANIMACION DE CARGA -->
    </div>
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
  </div>
</template>


<script setup>
import { ref,  computed, onMounted, onBeforeUnmount, onBeforeMount } from "vue";
// import { useCostoInvStore } from "../../../stores/lotesStore.js";
// import { useUsuarioStore } from "../../../stores/usuarioStore";
import { showAlert } from '../../../modules/sweetalert.js';


// const store = useLoteStore();
// const storeUser = useUsuarioStore();
// const stateUser = storeToRefs(storeUser);
const $q = useQuasar();
const hasItToken = $q.cookies.has('token')

let alert = ref(false);
let isAdd = ref(true);
let name = ref("");
let rows = ref([]);
let code = ref("");
let quantity = ref("");
let costs = ref("");
let date = ref("");
let detail = ref("");
let validarEditar = ref(true);
let InventoriForm = ref(false);
let InventoriFormr = ref(false);
// let createdAt = ref("");
let data = ref(null)
let id = ref(null)

function vaciarModal() {
  code.value = ''
  quantity.value = ''
  costs.value = ''
  detail.value = ''
  date.value = ''
  name.value = ''
}

async function ordenarCostos() {
  const res = await store.getLote();
  if (res.status == 200) {
    rows.value = res.data.costos;
  } else if (res.status == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}
ordenarCostos();

async function editarEstado(props) {
  console.log("hola");
  console.log(props);
  if (props.state == 1) {
    await store.activarLote(props);
  } else if (props.state == 0) {
    await store.desactivarLote(props);
  }
  ordenarCostos();
}

async function crearCostos() {
  if (name.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el nombre ",
    });
  } else if (code.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el codigo",
    });
  } else if (quantity.value == "") {
    $q.notify({
      type: "negative",
      message: "digite la cantidad ",
    });
  } else if (costs.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el valor ",
    });
  } else if (date.value == "") {
    $q.notify({
      type: "negative",
      message: "digite la fecha ",
    });
  } else if (detail.value == "") {
    $q.notify({
      type: "negative",
      message: "digite los detalles ",
    });
  }
  else if (validarEditar.value == true) {
    await store.addCosto(
      {
        code: code.value,
        quantity: quantity.value,
        costs: costs.value,
        detail: detail.value,
        date: date.value,
        name: name.value
      });
    ordenarCostos();
    console.log(rows.value);
    alert.value = false;
    $q.notify({
      type: "positive",
      message: "el costo ha sido creado correctamente",
    });
  }
  else if (validarEditar.value == false) {
    console.log(data.value);
    await store.editCosto(
      {
        id: data.value._id, name: name.value,
        code: code.value,
        quantity: quantity.value,
        costs: costs.value,
        detail: detail.value,
        date: date.value,
        name: name.value
      });
    ordenarCostos();
    $q.notify({
      type: "positive",
      message: "el costo ha sido actualizado correctamente",
    });
    alert.value = false
    validarEditar.value = true;
  }
}
function costoEditar(info) {
  validarEditar.value = false
  alert.value = true;
  data.value = info
  console.log("e", data.value);
  code.value = data.value.code
  quantity.value = data.value.quantity
  costs.value = data.value.costs
  detail.value = data.value.detail
  date.value = data.value.date
  name.value = data.value.name
}
const columns = [
  { name: "id", 
  label: "id", 
  // field (row) => row._id,
  required: false
  },
  {
    // label: "Nombre",
    // align: "center",
    // field: (row) => row.name,
    // format: (val) => `${val}`,
    // sortable: true,
    align: "left",
    field: (row) => row.customer,
    format: (val) => `${val.name}`,
    label: "Nombre",
    name: "nombre",
    sortable: true,
  },
  {
    name: "codigo",
    label: "codigo",
    field: "code"
  },
  {
    name: "cantidad",
    label: "cantidad",
    field: "quantity"
  },
  {
    name: "valor",
    label: "valor",
    field: "costs",
  },
  {
    name: "detalles",
    label: "detalles",
    field: "detail",
  },
  {
    name: "fecha",
    label: "fecha",
    field: "date",
  },
  { 
    name: "opciones", 
    align: "center", 
    abel: "Opciones", 
    field: "Opciones" 
  },
];

const columnss = ref([
  { name: 'calories', align: 'center', label: 'Valor', field: 'worth', sortable: true },
  { name: 'fat', label: 'Cantidad', field: 'quantity', sortable: true },
])

function abrirModal() {
  alert.value = true
}
function cerrarModal() {
  alert.value = false
  vaciarModal()
  validarEditar.value = true
}

const rowss = ref([])
let filter= ref('')
let selected= ref([])

function clean() {
  Nombre.value = codigo.value = cantidad.value = ''
}

function addOrder() {
  // pedidosForm.value = isAdd.value = true
  InventoriForm.value  = true
  readonly.value = false
}

function showDetailsOrder(ObjectOrder){
  InventoriForm.value = ! InventoriForm.value
  rowss.value = ObjectOrder.products
  console.log(ObjectOrder.products)
}

</script>


<style>
.cardcos {
  background-color: green;

}

.input {
  border-radius: 50px;
}

.buton {
  border-radius: 50px;
  margin: 3px 3px;
}

.lotesCard {
  margin-top: 30px;
}
</style>