<template>
  <div class="justify-center items-center d-flex">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="tituloF text-center">
          <h1 class="text-h6">Facturación</h1>
        </div>
      </div>
      <div class="col-4"></div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-6 text-center">
        <div class="q-pa-md q-gutter-sm">
          <q-btn @click="modalFacturacion = true">
          <span class="colorEnfasis">Crear Facturas</span>
          </q-btn>
        </div>
        <div class="q-pa-md">
          <q-table
            title="Facturas"
            :rows="rows"
            :columns="columns"
            row-key="nameMFa"
          />
        </div>
      </div>
      <div class="col-3"></div>
    </div>

    <q-dialog v-model="modalFacturacion">
      <q-card class="dialog">
        <q-card-section>
          <span class="text-black text-h6">Facturacion</span>

          <!-- <div class="text-black text-h6"></div> -->
          <q-btn @click="modalFacturacion = !modalFacturacion" class="bg-red text-white float-right" label="Cerrar" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="my-card d-flex">
            <q-card-section>
              <div class="row">
                <div class="col-5">
                  <q-input v-model="nameMFa" label="Nombre" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="numeroDocumentoMFa" label="Número Documento" />
                </div>
              <!--  -->
              <div class="col-5">
                <q-input v-model="celularMFa" label="Celular" />
              </div>
              <div class="col-2"></div>
              <div class="col-5">
                <q-input v-model="emailMFa" label="Email" />
              </div>
              <!--  -->
              <div class="col-5">
                <q-input v-model="celularMFa" label="Celular" />
              </div>
              <div class="col-2"></div>
              <div class="col-5">
                <q-input v-model="emailMFa" label="Email" />
              </div>
            </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="center">
              <q-btn @click="createUser()" style="color: #f39a31" class="q-my-md" label=" " />
            </q-card-actions>
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
  
<script setup>
import { ref } from "vue";

let nameMFa = ref("");
let numeroDocumentoMFa = ref("");
let celularMFa = ref("");
let emailMFa = ref("");
let detallesMFa = ref("");
let preferenciasMFa = ref("");
let estadoMFa = ref("");
let cantidadMFa = ref("");
let direccionMFa = ref("");

let users = ref([]);

let rows = ref([
  {
    name: "Tractor",
    NDocumento: "5wf5515wq142",
    celular: 3,
    email: "w@w.com",
  },
  {
    name: "Avion",
    NDocumento: "5w142",
    celular: 1,
    email: "a@a.com",
  },
]);

function createUser() {
  users.value.push({
    name: nameMFa.value,
    NDocumento: numeroDocumentoMFa.value,
    celularMFa: celularMFa.value,
    emailMFa: emailMFa.value,
  });

  rows.value.push(users.value[0]);
  users.value = [];

  // console.log(rows.value);
  modalFacturacion.value = !modalFacturacion.value;
}

const columns = [
  {
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },

  { name: "numeroDocumento", label: "Número Documento", field: "NDocumento" },
  { name: "celular", label: "Celular", field: "celular" },
  { name: "email", label: "email", field: "email" },
];

let modalFacturacion = ref(false);
let confirm = ref(false);
let prompt = ref(false);

let address = ref("");
// let model = ref()
</script>
<style>
/*  */
</style>