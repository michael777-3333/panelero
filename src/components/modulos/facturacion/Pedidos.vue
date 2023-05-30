<template>
  <div class="justify-center items-center d-flex">

    <div class="row">
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text-center">

        <div v-if="rows.length > 0" class="q-ma-xs-md q-ma-lg-sm">
          <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen pedidos!"
            card-class="bg-white text-black" table-class="text-black-8" table-header-class="text-green" flat bordered
            :visible-columns="visibleColumns" v-model:pagination="pagination">

            <template v-slot:top>
              <div class="col-6 " align="left">
                <span style="font-size: 25px;">Pedidos</span>
              </div>

              <div class="col-6" align="right">
                <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;"
                  @click="addOrder()" glossy label="Crear Pedidos" />
              </div>

            </template>


            <template v-slot:body-cell-opciones="props">
              <td>
                <q-btn class="botonEditar" style="background-color: #029127;" @click="editOrder(props.row)">
                  <q-icon style="color: white;" name="edit"></q-icon>
                </q-btn>
                <q-btn class="botonEditar">
                  <q-icon v-if="props.row.state == 1" @click="inactivedOrder(props.row._id)" style="color: green;"
                    name="toggle_on"></q-icon>
                  <q-icon v-else @click="activedOrder(props.row._id)" style="color: red;" name="toggle_off"></q-icon>
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
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
    </div>

    <q-dialog class="fit" v-model="modalPedidosa">
      <div class="row" style="background-color: red;">
        <q-card class="my-card">
          <q-card-section>
            <h1>fdfsffdf</h1>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>

    <q-dialog v-model="modalPedidos" persistent full-width transition-show="slide-up" transition-hide="slide-down">
      <div  class="bgColorEnfasis card q-pa-lg ">
      <!-- <q-card class="q-pa-lg bgColorEnfasis"> -->
        <q-card-section class="bgColorEnfasis">
          <!-- <h6 class="text-black">Pedidos</h6> -->
          <span class="text-black text-h6">Pedidos</span>
          <!-- <div class="text-black">Pedidos</div> -->

          <q-btn @click="modalPedidos = !modalPedidos" class="bg-red text-white float-right" label="X" />
          <!-- <span><br><br></span> -->
        </q-card-section>

        <q-card-section class="bgColorEnfasis q-pt-none">
          <q-card class="d-flex">
            <q-card-section>
              <div class="row">
                <div class="col-4 q-px-lg">
                  <q-input v-model="clienteMFa" label="Cliente" hint="Cliente" :dense="dense" :readonly="readonly" />
                </div>
                <!-- <div class="col-1"></div> -->
                <div class="col-4 q-px-lg">
                  <q-select filled v-model="tipoDocumentoMFa" :options="optionsDocument" label="Tipo de Documento"
                    stack-label :dense="dense" :options-dense="denseOpts" :readonly="readonly" />
                  <!-- <q-input v-model="tipoDocumentoMFa" label="Tipo de Documento" /> -->
                </div>
                <!-- <div class="col-1"></div> -->
                
                <div class="col-4 q-px-lg">
                  <q-input v-model="numeroDocumentoMFa" label="Número de documento" type="number" :readonly="readonly" />
                </div>
                <!-- <div class="col-2"></div>
                <div class="col-1"></div>
                 -->
                 <div class="col-4 q-px-lg">
                  <q-input v-model="celularMFa" label="Celular" :readonly="readonly" />
                </div>
                <!-- <div class="col-1"></div> -->

                <!--  -->
                <div class="col-4 q-px-lg">
                  <q-input v-model="emailMFa" label="Email" :readonly="readonly" />
                </div>
                <!-- <div class="col-2"></div> -->
                <!-- <div class="col-1"></div> -->

                <div class="col-4 q-px-lg">
                  <q-input v-model="detalles" label="Descripcion de la panela" :readonly="readonly" />
                </div>
                <!--  -->
                <div class="col-4 q-px-lg">
                  <q-input v-model="preferencias" label="Preferencia de la panela" :readonly="readonly" />
                </div>
                <!-- <div class="col-2"></div> -->
                <div class="col-4 q-px-lg">
                  <q-select filled v-model="estado" :options="optionsStatus" label="Estado del pedido" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                <!--  -->
                <div class="col-4 q-px-lg">
                  <q-input v-model="cantidad" label="Cantidad de panela" type="number" :readonly="readonly" />
                </div>
                <!-- <div class="col-2"></div> -->
                <div class="col-4 q-px-lg">
                  <q-input v-model="direccionEnvio" label="Dirección de envio" :readonly="readonly" />
                </div>
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="right">
              <q-btn @click="modalPedidos = !modalPedidos" class="bg-red text-white" label="Cerrar" />

              <q-btn class="q-my-md colorEnfasis">
                <span v-if="isAdd == true" @click="createOrder()">Crear Pedido</span>
                <span v-else @click="changeStatus()">Modificar Pedido</span>
              </q-btn>

            </q-card-actions>

          </q-card>
        </q-card-section>

      <!-- </q-card> -->
    </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePedidoStore } from '../../../stores/pedidos.js'

const store = usePedidoStore()

let clienteMFa = ref("");
let numeroDocumentoMFa = ref("");
let tipoDocumentoMFa = ref("");
let celularMFa = ref("");
let emailMFa = ref("");
let detalles = ref("")
let preferencias = ref("")
let estado = ref(null)
let cantidad = ref("")
let direccionEnvio = ref("")
let optionsStatus = ref(['Proceso', 'Entregado', 'Cancelado', 'Realizado']);
let optionsDocument = ref(['CC', 'TI', 'CE', 'PS', 'DNI', 'NIT', 'PR', 'PEP', 'PPT']);

let visibleColumns = ref(['nombre', 'cantidad', 'estado', 'opciones'])
let id = null;
let isAdd = ref(true);
let readonly = ref(false);
let dense = ref(!true);
let denseOpts = ref(true);
let modalPedidos = ref(false);
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

  { name: "nombre", align: "left", label: "Cliente", field: "customerName", sortable: true, },
  { name: "cantidad", label: "Cantidad", field: "quantityOfPanela" },
  { name: "estado", label: "Estado", field: "orderStatus", sortable: true,  },
  { name: "opciones", align: "center", label: "Opciones", field: "Opciones" },
];

function clean() {
  cantidad.value = celularMFa.value = clienteMFa.value = detalles.value = direccionEnvio.value = emailMFa.value = estado.value = numeroDocumentoMFa.value = preferencias.value = tipoDocumentoMFa.value = ''
}

function addOrder() {
  modalPedidos.value = isAdd.value = true
  readonly.value = false
}

async function getOrders() {

  const res = await store.getPedido()
  
  // console.log(res.data.pedidos);
  if (res.status == 200) {
    rows.value = res.data
  } else if (res.status == 403) {
    console.log("No existe token");
  } else if (res.status == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}

getOrders();

async function createOrder() {
  await store.addPedido({
    customerName:        clienteMFa.value,
    descriptionOfPanela: detalles.value,
    documentNumber:      numeroDocumentoMFa.value,
    documentType:        tipoDocumentoMFa.value,
    email:               emailMFa.value,
    orderStatus:         estado.value,
    phoneNumber:         celularMFa.value,
    preferencesOfPanela: preferencias.value,
    quantityOfPanela:    cantidad.value,
    sendAddress:         direccionEnvio.value,
  });

  getOrders();
  clean();
  modalPedidos.value = !modalPedidos.value;
}

function editOrder({ _id, quantityOfPanela, phoneNumber, customerName, descriptionOfPanela, sendAddress, email, orderStatus, documentNumber, preferencesOfPanela, documentType, }) {
  modalPedidos.value = !modalPedidos.value
  isAdd.value = false
  readonly.value = true
  id = _id
  cantidad.value = quantityOfPanela
  celularMFa.value = phoneNumber
  clienteMFa.value = customerName
  detalles.value = descriptionOfPanela
  direccionEnvio.value = sendAddress
  emailMFa.value = email
  estado.value = orderStatus
  numeroDocumentoMFa.value = documentNumber
  preferencias.value = preferencesOfPanela
  tipoDocumentoMFa.value = documentType
}

async function changeStatus() {
  if (id != null) {
    await store.editPedido({
      id: id,
      orderStatus: estado.value,
    });
    id = null
    clean()
  }

  getOrders();
  modalPedidos.value = !modalPedidos.value;
}
async function inactivedOrder(id) {
  await store.disabledOrder(id)
  getOrders();
}

async function activedOrder(id) {
  await store.enabledOrder(id)
  getOrders();
}

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 8
  // rowsNumber: xx if getting data from a server
})
let maximizedToggle=ref(true)

const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage))
  // console.log(pagesNumber);

</script>
  
<style scoped>
/*_*/
</style>