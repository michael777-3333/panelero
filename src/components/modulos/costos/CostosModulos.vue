<template>
  <div class="justify-center items-center d-flex">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="text-center">
          <h1 class="borderTitle text-h6">Costo Inventario</h1>
        </div>
      </div>
      <br />
      <div class="col-4"></div>
    </div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="text-center">
          <q-btn @click="alertt = true">
            <span class="">Crear Costo</span>
          </q-btn>
        </div>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="costo inventario"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
  <q-dialog v-model="alertt">
    <q-card class="dialog1" style="background-color: #f39a31">
      <q-card-section>
        <div style="color: " class="text-h6">Nuevo Costo</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-card class="my-card d-flex" style="width: 100%">
          <q-card-section class="cardse">
            <div class="row">
              <div class="col-6">
                <div class="">
                  <div class="boton2">
                    <q-input v-model="nameC" label="Nombre" />
                  </div>
                </div>
                <div class="">
                  <div class="boton2">
                    <q-input v-model="codigoC" label="Codigo" />
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="">
                  <div class="boton2">
                    <q-input v-model="cantidadC" label="Cantidad" />
                  </div>
                </div>
                <div class="">
                  <div class="boton2">
                    <q-input v-model="costoC" label="Costo" />
                  </div>
                </div>
              </div>
            </div>

            <div class="fecha_costo q-pa-md" style="max-width: 370px">
              <q-input filled v-model="dateC" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="dateC">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
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
          <q-card-actions align="center"> </q-card-actions>
        </q-card>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" class="boo" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
let alertt = ref(false);

let nameC=ref('')
let codigoC = ref('')
let dateC=ref('')
let cantidadC=ref('')
let costoC=ref('')

const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "codigo", label: "Codigo", field: "codigo" },
  { name: "cantidad", label: "Cantidad", field: "cantidad" },
  { name: "date", label: "Fecha", field: "date" },
  { name: "costo", label: "Costo", field: "costo" },
  // {
  //   // required: true,
  //   // label: "Nombre",
  //   // align: "left",
  //   // field: (row) => row.name,
  //   // format: (val) => `${val}`,
  //   // sortable: true,
  // },
];

let users = ref([])
const rows = ref([
  {
    name: "Tractor",
    codigo: "5wf5515wq142",
    date: "2019/02/01",
    cantidad: 3,
    costo: "500.000.000",
  },
  {
    name: "Avion",
    codigo: "5w142",
    date: "2019/02/01",
    cantidad: 1,
    costo: "1.500.000.000",
  },
  {
    name: "Tractor",
    codigo: "5wf5515wq142",
    date: "2019/02/01",
    cantidad: 3,
    costo: "500.000.000",
  },
  {
    name: "Avion",
    codigo: "5w142",
    date: "2019/02/01",
    cantidad: 1,
    costo: "1.500.000.000",
  },
  {
    name: "Tractor",
    codigo: "5wf5515wq142",
    date: "2019/02/01",
    cantidad: 3,
    costo: "500.000.000",
  },
  {
    name: "Avion",
    codigo: "5w142",
    date: "2019/02/01",
    cantidad: 1,
    costo: "1.500.000.000",
  },
  {
    name: "Tractor",
    codigo: "5wf5515wq142",
    date: "2019/02/01",
    cantidad: 3,
    costo: "500.000.000",
  },
  {
    name: "Avion",
    codigo: "5w142",
    date: "2019/02/01",
    cantidad: 1,
    costo: "1.500.000.000",
  },
  {
    name: "Tractor",
    codigo: "5wf5515wq142",
    date: "2019/02/01",
    cantidad: 3,
    costo: "500.000.000",
  },
  {
    name: "Avion",
    codigo: "5w142",
    date: "2019/02/01",
    cantidad: 1,
    costo: "1.500.000.000",
  },
  {
    name: "Tractor",
    codigo: "5wf5515wq142",
    date: "2019/02/01",
    cantidad: 3,
    costo: "500.000.000",
  },
  {
    name: "Avion",
    codigo: "5w142",
    date: "2019/02/01",
    cantidad: 1,
    costo: "1.500.000.000",
  },
  {
    name: "Tractor",
    codigo: "5wf5515wq142",
    date: "2019/02/01",
    cantidad: 3,
    costo: "500.000.000",
  },
  {
    name: "Avion",
    codigo: "5w142",
    date: "2019/02/01",
    cantidad: 1,
    costo: "1.500.000.000",
  },
])

// export default {
//   setup() {
//     return {
//       columns,
//       rows,
//       alertt,
//     };
//   },
// };
function createUser() {
  users.value.push({
    name: nameC.value,
    codigo: codigoC.value,
    date: dateC.value,
    cantidad: cantidadC.value,
    costo: costoC.value,
  });

  rows.value.push(users.value[0]);
  users.value = [];

  // console.log(rows);
}

let confirm = ref(false);
let prompt = ref(false);
let address = ref("");
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 400px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #f39a31

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
