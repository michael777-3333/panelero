<template>
  <div class="justify-center items-center d-flex">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="tituloF text-center ">
          <h1 class="tituloh1 text-h6">Facturación</h1>
        </div>
      </div>
      <div class="col-4"></div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-6 text-center">
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            label="Crear Facturación"
            style="color: #f39a31"
            @click="modalFacturacion = true"
          />
        </div>
        <div class="q-pa-md">
          <q-table
            title="Facturas"
            :rows="rows"
            :columns="columns"
            row-key="name"
          />
        </div>
      </div>
      <div class="col-3"></div>
    </div>

    <q-dialog v-model="modalFacturacion">
      <q-card class="dialog">
        <q-card-section>
          <div style="color: black" class="text-h6">Facturacion</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="my-card d-flex" style="width: 100%">
            <q-card-section>
              <div class="row">
                <div class="col-5">
                  <div class="boton">
                    <q-input v-model="name" label="Nombre" />
                  </div>
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <div class="boton">
                    <q-input v-model="numeroDocumentoMFa" label="Número Documento" />
                  </div>
                </div>
              </div>
              <div class="row d-flex q-m-sm">
                <div class="col-5">
                  <div class="boton">
                    <q-input v-model="celularMFa" label="Celular" />
                  </div>
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <div class="boton">
                    <q-input v-model="costo" label="Costo" />
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="center">
              <q-btn
                @click="createUser()"
                style="color: #f39a31"
                class="q-my-md"
                label="Guardar Costo"
              />
            </q-card-actions>
            <q-card-actions align="center">
              <q-btn
                @click="modalFacturacion = !modalFacturacion"
                style="color: #f39a31"
                class="q-my-md"
                label="Descartar"
              />
            </q-card-actions>
          </q-card>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" style="color: #f39a31" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

let name = ref("");
let numeroDocumentoMFa = ref("");
let celularMFa = ref("");
let costo = ref("");
let users = ref([]);

let rows = ref([
  {
    name: "Tractor",
    numeroDocumentoMFa: "5wf5515wq142",
    celularMFa: 3,
    costo: "500.000.000",
  },
  {
    name: "Avion",
    numeroDocumentoMFa: "5w142",
    celularMFa: 1,
    costo: "1.500.000.000",
  },
]);

function createUser() {
  users.value.push({
    name: name.value,
    numeroDocumentoMFa: numeroDocumentoMFa.value,
    celularMFa: celularMFa.value,
    costo: costo.value,
  });

  rows.value.push(users.value[0]);
  users.value = [];

  console.log(rows.value);
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

  { name: "numeroDocumentoMFa", label: "Número Documento", field: "numeroDocumentoMFa" },
  { name: "celularMFa", label: "Cantidad", field: "celularMFa" },
  { name: "costo", label: "Costo", field: "costo" },
];

let modalFacturacion = ref(false);
let confirm = ref(false);
let prompt = ref(false);

let address = ref("");
// let model = ref()
</script>
  
  <style>
.tituloF {
  background-color: #f39a31;
  border-radius: 30px;
}

.tituloh1 {
  font-size: 20px;
}

/* .my-card{
      background-color: #f3993181;
      border-radius: 30px;
      margin-left: 60%;
  } */
.boton {
  /* margin-top: 5px; */
  /* background-color: #cace06; */
  border-radius: 30px;
  margin: 3px 3px;
  /* height: 40px; */
}

.my-card-width {
  max-width: 600px;
}

.dialog {
  background-color: #f39a31;
  width: 1000px;
}

/*  */
</style>