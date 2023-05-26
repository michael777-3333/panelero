<template>

<div class="row">
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text-center">

      <div class="q-ma-xs-md q-ma-lg-sm">
        <q-table :rows="rows" :columns="columns" row-key="id" no-data-label="No existen pedidos!"
          :visible-columns="visibleColumns">
          <template v-slot:top="props">
            <div class="col-6 " align="left"><span style="font-size: 25px;">Costo Inventario</span></div>
            <div class="col-6" align="right">
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="alert = true"
                glossy label="Crear Costo" />
            </div>
          </template>

          <template v-slot:body-cell-editar="props">
            <td>
              <q-btn class="botonEditar" style="background-color: #029127;" @click="editOrder(props.row)">
                <q-icon style="color: white;" name="edit"></q-icon>
              </q-btn>
            </td>

          </template>
        </q-table>
      </div>
    </div>
    <div class="col-xs-auto col-sm-1 col-md-2 col-lg-3"></div>
  </div>

    <div class="conta row justify-center items-center d-flex">
      <q-dialog v-model="alert">
        <q-card class="cos_admin targeta" style="background-color: #f39a31">
          <q-card-section>
            <div class="text-h6">Nuevo costo</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-card class="my-card d-flex" style="width: 100%">
              <q-card-section class="cardse">
                <br />
                <div class="row">
                  <div class="col-6">
                    <div class="">
                      <div class="boton">
                        <q-input v-model="nameA" label="Nombre" />
                      </div>
                    </div>
                    <br />
                    <div class="">
                      <div class="boton">
                        <q-input v-model="codigoA" label="Codigo" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="">
                      <div class="boton">
                        <q-input v-model="costoA" label="Costo" />
                      </div>
                    </div>
                    <br />
                    <div class="">
                      <div class="boton">
                        <q-input v-model="detalleA" label="Detalle" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="boton">
                    <q-input v-model="quantityA" label="Cantidad" />
                  </div>
                </div>
                <div class="q-pa-md text center" style="max-width: 600px ">
                  <q-input filled v-model="date" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="date">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
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
                <q-btn @click="createUser()" style="color: #f39a31" class="q-my-md" label="Guardar costo" />
              </q-card-actions>
              <q-card-actions align="center">
              </q-card-actions>
            </q-card>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" style="" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";

import { useQuasar } from 'quasar';

let nameA = ref("");
let codigoA = ref("");
let dateA = ref("");
let detalleA = ref("");
let costoA = ref("");
let quantityA = ref("");


let users = ref([]);
let alert = ref(false);


let rows = ref([
  {
    name: "Tractor",
    code: "5wf5515wq142",
    quantity: "25",
    date: "2019/02/01",
    costo: "500.000.000",
    detalle: "adwquirido por necesidad",
  },
  {
    name: "Avion",
    code: "5w142",
    date: "2019/02/01",
    costo: "500.000.000",
    detalle: "adquirido por necesidad",
  },
]);

function createUser() {
  users.value.push({
    name: nameA.value,
    code: codigoA.value,
    quantity: quantityA.value,
    date: dateA.value,
    costo: costoA.value,
    detalle: detalleA.value,
  });

  rows.value.push(users.value[0]);
  users.value = [];

  console.log(rows.value);
  modalAdmin.value = !modalAdmin.value
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
  { name: "cantidad", label: "Cantidad", field: "quantity" },
  { name: "fecha", label: "Fecha", field: "date" },
  { name: "costo", label: "Costo", field: "costo" },
  { name: "detalle", label: "Detalle", field: "detalle" },
];

let modalAdmin = ref(false);
// let alert = ref(false);
let confirm = ref(false);
let prompt = ref(false);

let address = ref("");
</script>

<style></style>
