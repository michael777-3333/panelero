<template>
  <div class="justify-center items-center d-flex">

    <div class="row ">
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text-center">

          <div class="row q-ma-md">
            <div class="col-4"></div>
            <div class="col-4">
              <h1 class="text-h6 bgColorEnfasis borderTitle">Pedidos</h1>
            </div>
            <div class="col-4"></div>
            <div class="col-12 q-my-md">
              <q-btn class="colorEnfasis" @click="addOrder()" glossy label="Crear Pedidos" />
            </div>
          </div>

        <div class="q-ma-xs-md q-ma-lg-sm">
          <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen pedidos!" :visible-columns="visibleColumns">
            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn class="botonEditar" @click="editOrder(props.row)" glossy label="Editar" />
              </td>

            </template>
          </q-table>
        </div>
      </div>
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
    </div>

    <q-dialog v-model="modalPedidos">
      <q-card class="bgColorEnfasis">
        <q-card-section>
          <!-- <h6 class="text-black">Pedidos</h6> -->
          <span class="text-black text-h6">Pedidos</span>
          <!-- <div class="text-black">Pedidos</div> -->

          <q-btn @click="modalPedidos = !modalPedidos" class="bg-red text-white float-right" label="Cerrar" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="my-card d-flex">
            <q-card-section>
              <div class="row">
                <div class="col-5">
                  <q-input v-model="clienteMFa" label="Cliente" hint="Cliente" :dense="dense" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-select filled v-model="tipoDocumentoMFa" :options="optionsDocument" label="Tipo de Documento"
                    stack-label :dense="dense" :options-dense="denseOpts" :readonly="readonly" />
                  <!-- <q-input v-model="tipoDocumentoMFa" label="Tipo de Documento" /> -->
                </div>
                <div class="col-5">
                  <q-input v-model="numeroDocumentoMFa" label="Número de documento" type="number" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="celularMFa" label="Celular" :readonly="readonly" />
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="emailMFa" label="Email" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="detalles" label="Descripcion de la panela" :readonly="readonly" />
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="preferencias" label="Preferencia de la panela" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-select filled v-model="estado" :options="optionsStatus" label="Estado del pedido" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="cantidad" label="Cantidad de panela" type="number" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="direccionEnvio" label="Dirección de envio" :readonly="readonly" />
                </div>
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="center">
              <q-btn class="q-my-md colorEnfasis">
                <span v-if="isAdd == true" @click="createOrder()">Crear Pedido</span>
                <span v-else @click="changeStatus()">Modificar Pedido</span>
              </q-btn>
            </q-card-actions>

          </q-card>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
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

let visibleColumns = ref(['nombre', 'cantidad', 'numeroDocumento', 'editar'])
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
  { name: "numeroDocumento", label: "Estado", field: "orderStatus" },
  { name: "editar", align: "center", label: "Editar", field: "Editar" },
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
  
  console.log(res.data.pedidos);
  if (res.status == 200) {
    rows.value = res.data.pedidos
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

</script>
  
<style scoped>
/*_*/
</style>