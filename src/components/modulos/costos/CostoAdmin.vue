<template>
  <div class="justify-center items-center d-flex">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="text-center">
          <h1 class="bgColorEnfasis borderTitle text-h6">Costo Administracion</h1>
        </div>
      </div>
      <div class="col-4"></div>
    </div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="text-center">
          <q-btn
            label="Crear Costo"
            style="color: #f39a31"
            @click="alert = true"
          />
        </div>
      </div>
      <div class="col-4"></div>
    </div>
    <!-- <div class="contenedorBoton q-pa-md q-gutter-sm justify-center items-center d-flex">
        <q-btn label="Crear Costo" style="color: #f39a31" @click="alert = true" />
      </div> -->

    <div class="conta row justify-center items-center d-flex">
      <div class="row1 col-8 justify-center">
        <div class="cost q-pa-md">
          <q-table
            title="Lista Administrativa"
            :rows="rows"
            :columns="columns"
            row-key="name"
          />
        </div>
      </div>

      <q-dialog v-model="alert">
        <q-card class="targeta">
          <q-card-section>
            <div style="color: " class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-card class="my-card d-flex" style="width: 100%">
              <q-card-section>
                <div class="">
                  <div class="boton">
                    <q-input v-model="name" label="Nombre" />
                  </div>
                </div>
                <div class="">
                  <div class="boton">
                    <q-input v-model="codigo" label="Codigo" />
                  </div>
                </div>
                <div class="q-pa-md" style="max-width: 500px">
                  <q-input filled v-model="date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="date">
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
                <div class="">
                  <div class="boton">
                    <q-input v-model="costo" label="Costo" />
                  </div>
                </div>
                <div class="">
                  <div class="boton">
                    <q-input v-model="detalle" label="Detalle" />
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="center">
                <q-btn
                  @click="createUser()"
                  style="color: #f39a31"
                  class="q-my-md"
                  label="Guardar Cobro"
                />
              </q-card-actions>
              <q-card-actions align="center">
                <!-- <q-btn
                    @click=""
                    style="color: #f39a31"
                    class="q-my-md"
                    label="Descartar"
                  /> -->
              </q-card-actions>
            </q-card>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" style="" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

let name = ref("");
let codigo = ref("");
let date = ref("");
let detalle= ref("");
let costo = ref("");
let users = ref([]);

let rows = ref([
  {
    name: "Tractor",
    codigo: "5wf5515wq142",
    date: "2019/02/01",
    costo: "500.000.000",
    detalle: "adwquirido por necesidad"
    
  },
  {
    name: "Avion",
    codigo: "5w142",
    date: "2019/02/01",
    costo: "500.000.000",
    detalle: "adquirido por necesidad"
  },
]);

function createUser() {
  users.value.push({
    name: name.value,
    codigo: codigo.value,
    fecha: fecha.value,
    costo: costo.value,
    detalle: detalle.value,
  });

  rows.value.push(users.value[0]);
  users.value = [];

  console.log(rows.value);
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

  { name: "codigo", label: "Codigo", field: "codigo" },
  { name: "fecha", label: "Fecha", field: "date" },
  // { name: "cantidad", label: "Cantidad", field: "cantidad" },
  { name: "costo", label: "Costo", field: "costo" },
  { name: "detalle", label: "Detalle", field: "detalle" },
];

let alert = ref(false);
let confirm = ref(false);
let prompt = ref(false);

let address = ref("");
</script>
  
  <style>
</style>

