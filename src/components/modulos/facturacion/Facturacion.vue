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
            row-key="nameMFa"
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
                    <q-input v-model="nameMFa" label="Nombre" />
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
                    <q-input v-model="emailMFa" label="Email" />
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
                    <q-input v-model="emailMFa" label="Email" />
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

let nameMFa = ref("");
let numeroDocumentoMFa = ref("");
let celularMFa = ref("");
let emailMFa = ref("");
let detallesMFa = ref("")
let preferenciasMFa = ref("")
let estadoMFa = ref("")
let cantidadMFa = ref("")
let direccionMFa = ref("")

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