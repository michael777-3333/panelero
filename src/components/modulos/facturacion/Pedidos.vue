<template>
  <div class="justify-center items-center d-flex">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="bgColorEnfasis borderTitle text-center ">
          <h1 class="text-h6">Pedidos</h1>
        </div>
      </div>
      <div class="col-4"></div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-6 text-center">
        <div class="q-pa-md q-gutter-sm">
          <button @click="addOrder()" class="q-btn">
            <span class="colorEnfasis">Crear Pedidos</span>
          </button>
        </div>
        <div class="q-pa-md">
          <q-table title="Pedidos" :rows="rows" :columns="columns" row-key="clienteMFa">
            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn class="botonEditar" @click="editOrder(props.row)" glossy label="Editar" />
              </td>

            </template>
          </q-table>
        </div>
      </div>
      <div class="col-3"></div>
    </div>

    <q-dialog v-model="modalPedidos">
      <q-card class="bgColorEnfasis" style="background-color: #f39a31;">
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
                  <q-input v-model="detallesMFa" label="Descripcion de la panela" :readonly="readonly" />
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="preferenciasMFa" label="Preferencia de la panela" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-select filled v-model="estadoMFa" :options="optionsStatus" label="Estado del pedido" stack-label
                    :dense="dense" :options-dense="denseOpts" />
                  <!-- <q-input v-model="" label="Estado del pedido" /> -->
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="cantidadMFa" label="Cantidad de panela" type="number" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="direccionMFa" label="Dirección de envio" :readonly="readonly" />
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="center">
              <q-btn class="q-my-md">
                <span v-if="isAdd == true" @click="createOrder()" class="colorEnfasis">Crear Pedido</span>
                <span v-else @click="changeSatus()" class="colorEnfasis">Modificar Pedido</span>
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
import axios from 'axios';
import { usePedidoStore } from '../../../stores/pedidos.js'
import { useUsuarioStore } from '../../../stores/usuarioStore'
import { storeToRefs } from "pinia";

const store = usePedidoStore()
const storeUsuario = useUsuarioStore()
const stateUser = storeToRefs(storeUsuario)

let clienteMFa = ref("");
let numeroDocumentoMFa = ref("");
let tipoDocumentoMFa = ref("");
let celularMFa = ref("");
let emailMFa = ref("");
let detallesMFa = ref("")
let preferenciasMFa = ref("")
let estadoMFa = ref(null)
let cantidadMFa = ref("")
let direccionMFa = ref("")
let modalPedidos = ref(false);
let optionsStatus = ref(['Proceso', 'Entregado', 'Cancelado', 'Realizado']);
let optionsDocument = ref(['CC', 'TI', 'CE', 'PS', 'DNI', 'NIT', 'PR', 'PEP', 'PPT']);
let dense = ref(!true);
let denseOpts = ref(true);
let rows = ref([])
const columns = [
  {
    required: true,
    label: "Cliente",
    align: "left",
    field: (row) => row.customerName,
    format: (val) => `${val}`,
    sortable: true,
  },

  { name: "cantidad", label: "Cantidad", field: "quantityOfPanela" },
  { name: "numeroDocumento", label: "Estado", field: "orderStatus" },
  { name: "editar", label: "Editar", field: "Editar" },
];
let _id = null
let isAdd = ref(true)
let readonly = ref(false)


function addOrder() {
  modalPedidos.value = isAdd.value = true
  readonly.value = false
}

async function ordenarPedidos() {
  store.getToken(stateUser.token.value)
  const res = await store.getPedido()

  if (res.status == 200) {
    rows.value = res.data.pedidos
  } else if (res.response == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}

ordenarPedidos();

async function createOrder() {
  await store.addPedido({
    customerName: clienteMFa.value,
    descriptionOfPanela: detallesMFa.value,
    documentNumber: numeroDocumentoMFa.value,
    documentType: tipoDocumentoMFa.value,
    email: emailMFa.value,
    orderStatus: estadoMFa.value,
    phoneNumber: celularMFa.value,
    preferencesOfPanela: preferenciasMFa.value,
    quantityOfPanela: cantidadMFa.value,
    sendAddress: direccionMFa.value,
  });

  ordenarPedidos();
  modalPedidos.value = !modalPedidos.value;
}

function editOrder(paramass) {
  modalPedidos.value = !modalPedidos.value
  isAdd.value = false
  readonly.value = true
  _id = paramass._id
  cantidadMFa.value = paramass.quantityOfPanela
  celularMFa.value = paramass.phoneNumber
  clienteMFa.value = paramass.customerName
  detallesMFa.value = paramass.descriptionOfPanela
  direccionMFa.value = paramass.sendAddress
  emailMFa.value = paramass.email
  estadoMFa.value = paramass.orderStatus
  numeroDocumentoMFa.value = paramass.documentNumber
  preferenciasMFa.value = paramass.preferencesOfPanela
  tipoDocumentoMFa.value = paramass.documentType
}

async function changeSatus() {
  await store.editPedido({
    id: _id,
    orderStatus: estadoMFa.value,
  });
  
  ordenarPedidos();
  modalPedidos.value = !modalPedidos.value;
}

</script>
  
<style scoped>
/*_*/
</style>