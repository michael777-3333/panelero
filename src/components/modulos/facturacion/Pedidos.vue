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
          <button @click="modalPedidos = true" class="q-btn">
            <span class="colorEnfasis">Crear Pedidos</span>
            </button>
        </div>
        <div class="q-pa-md">
          <q-table title="Pedidos" :rows="rows" :columns="columns" row-key="clienteMFa" />
        </div>
      </div>
      <div class="col-3"></div>
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
                  <q-input v-model="clienteMFa" label="Cliente" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="tipoDocumentoMFa" label="Tipo de Documento" />
                </div>
                <div class="col-5">
                  <q-input v-model="numeroDocumentoMFa" label="Número de documento" type="number" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="celularMFa" label="Celular" />
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="emailMFa" label="Email" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="detallesMFa" label="Descripcion de la panela" />
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="preferenciasMFa" label="Preferencia de la panela" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="estadoMFa" label="Estado del pedido" />
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="cantidadMFa" label="Cantidad la panela" type="number" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="direccionMFa" label="Dirección" />
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="center">
              <q-btn @click="createOrder()" class="q-my-md ">
                <span class="colorEnfasis">Crear Pedido</span>
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
import axios from 'axios';

//  VARIABLES A UTILIZAR
const store = usePedidoStore()

async function ordenarPedidos() {
  await Promise.all([store.getPedido()]).then(response => rows.value = response[0].data.pedidos);
}

let clienteMFa = ref("");
let numeroDocumentoMFa = ref("");
let tipoDocumentoMFa = ref("");
let celularMFa = ref("");
let emailMFa = ref("");
let detallesMFa = ref("")
let preferenciasMFa = ref("")
let estadoMFa = ref("")
let cantidadMFa = ref("")
let direccionMFa = ref("")

let users = ref([]);
let rows = ref([])

ordenarPedidos();

async function createOrder() {
  // users.value.push();
  
  await store.addPedido({
    customerName: clienteMFa.value,
    documentType: tipoDocumentoMFa.value,
    documentNumber: numeroDocumentoMFa.value,
    phoneNumber: celularMFa.value,
    email: emailMFa.value,
    descriptionOfPanela: detallesMFa.value,
    preferencesOfPanela: preferenciasMFa.value,
    orderStatus: estadoMFa.value,
    quantityOfPanela: cantidadMFa.value,
    address: direccionMFa.value,
  });
  ordenarPedidos();
  // rows.value.push(users.value[0]);
  // users.value = [];

  modalPedidos.value = !modalPedidos.value;
}

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
  // { name: "email", label: "email", field: "email" },
];

let modalPedidos = ref(false);
let confirm = ref(false);
let prompt = ref(false);

let address = ref("");
// let model = ref()
</script>
  
<style scoped>
/*  */
</style>