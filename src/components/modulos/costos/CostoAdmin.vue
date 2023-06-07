<template>
  <div class="justify-center items-center d-flex">

    <div class="row" style="margin-top: 10%;">
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
        <!-- <div v-if="rows.length > 0" class="q-ma-xs-md q-ma-lg-sm"> -->
          <q-table class="paddingTabla" title="Costos" :rows="rows" :columns="columns" row-key="name">


            <template v-slot:top="props">
              <div class="col-6" align="left"><span style="font-size: 25px;">Costo Administrativo</span></div>
              <div class="col-6" align="right">
                <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;"
                  @click="abrirModal()" glossy label="Crear costo" />
              </div>
            </template>


            <template v-slot:body-cell-state="props">
              <td>
                <q-checkbox v-model="props.row.state" color="green" :true-value="1" :false-value="0"
                  @click="editarEstado(props.row)" />
              </td>
            </template>

            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn class="botonEditar" style="background-color:#029127 ;" @click="costoEditar(props.row)" glossy>
                  <q-icon style="color: white;" name="edit"></q-icon>
                </q-btn>
              </td>
            </template>
          </q-table>
        <!-- </div> -->
        <!-- <div v-else class="q-ma-xs-md q-ma-lg-sm" style="margin-top: 5%;">
          <q-linear-progress dark query color="green" class="q-mt-sm" />
          <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" />
        </div> -->
      </div>

      
      
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
      <q-dialog v-model="alert" none  persistent >
        <q-card class="dialogcost" style="background-color: rgb(5, 124, 21);" >
          <q-card-section class="cardcos">
            <div style="color:  white" class="text-h6">Costos</div>
          </q-card-section>

          <q-card-section class="q-pt-none ">
            <q-card class="CardCos d-flex ">
              <q-card-section>
                <div class="row">
                  <div class="col-5" style="margin-left: 5%;">
                    <div class="buton">
                      <q-input filled v-model="name" class="input" label="Nombre" :dense="dense" />
                    </div>
                  </div>
               
                  <div class="col-5" style="margin-left: 4%;">
                    <div class="buton">
                      <q-input filled v-model="code" class="input" label="codigo" :dense="dense" />
                    </div>
                  </div>
         

                  <div class="col-5" style="margin-left: 5%; margin-top: 8px;">
                    <div class="buton">
                      <q-input filled v-model="quantity" class="input" label="cantidad" :dense="dense" />
                    </div>
                  </div>

                  <div class="col-5" style="margin-left: 4%; margin-top: 8px;">
                    <div class="buton">
                      <q-input filled v-model="costs" class="input" label="valor" :dense="dense" />
                    </div>
                  </div>
                  <!-- <div class="col-1"></div>
                  <div class="col-1"></div> -->
                  <div class="col-5" style="margin-left: 5%; margin-top: 8px;">
                    <div class="buton">
                      <q-input filled v-model="date" class="input" type="date" label="Fecha" :dense="dense" />

                      <!-- <q-input v-model="createdAt" label="fecha" /> -->
                    </div>
                  </div>
                  <div class="col-5" style="margin-left: 4%; margin-top: 8px;">
                    <div class="buton">
                      <q-input filled v-model="detail" class="input" label="Detalles" :dense="dense" />

                      <!-- <q-input v-model="createdAt" label="fecha" /> -->
                    </div>
                  </div>
                </div>


              </q-card-section>
              <q-separator />
              <q-card-actions align="center">
                <q-btn @click="crearCostos()" style="bottom: green; color: white;" class="q-my-md bg-green"
                  label="Crear Costo" />
                <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />
              </q-card-actions>
            </q-card>
          </q-card-section>

          <!-- <q-card-actions align="right">
            <q-btn flat label="OK" style="color: #f39a31" v-close-popup />
          </q-card-actions> -->
        </q-card>
      </q-dialog>
   
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
// import { useadmincostStore } from "../../../stores/admincostStore.js";
import { storeToRefs } from "pinia";

import { useQuasar } from "quasar";

// const store = useadmincostStore();
// const storeUser = useadmincostStore();
// const stateUser = storeToRefs(storeUser);
const $q = useQuasar();
const hasItToken = $q.cookies.has('token')

let alert = ref(false);
let name = ref("");
let rows = ref([]);
let code = ref("");
let quantity = ref("");
let costs=ref("")
let date=ref("")
let detail=ref("")
let validarEditar = ref(true)
// let createdAt = ref("");
let data = ref(null)
let id = ref(null)

function vaciarModal() {
  code.value=''
  quantity.value=''
  costs.value=''
  detail.value=''
  date.value=''
  name.value=''
}

async function ordenarCostos() {
  const res = await store.getAdmincost();
  if (res.status == 200) {
    rows.value = res.data.costos;
  } else if (res.status == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}
ordenarCostos();

async function editarEstado(props) {
  console.log("hola");
  console.log(props);
  if (props.state == 1) {
    await store.activarAdmincost(props);
  } else if (props.state == 0) {
    await store.desactivarAdmincost(props);
  }
  ordenarCostos();
}

async function crearCostos() {
  if (name.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el nombre ",
    });
  }else if (code.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el codigo",
    });
  } else if (quantity.value == "") {
    $q.notify({
      type: "negative",
      message: "digite la cantidad ",
    });
  }else if (costs.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el valor ",
    });
  }else if (date.value == "") {
    $q.notify({
      type: "negative",
      message: "digite la fecha ",
    });
  }else if (detail.value == "") {
    $q.notify({
      type: "negative",
      message: "digite los detalles ",
    });
  }
  else if (validarEditar.value == true) {
    await store.addCosto(
      {
        code: code.value, 
      quantity: quantity.value,
      costs:costs.value,
      detail:detail.value,
      date:date.value,
      name:name.value
    });
    ordenarCostos();
    console.log(rows.value);
    alert.value = false;
    $q.notify({
      type: "positive",
      message: "el costo ha sido creado correctamente",
    });
  }
  else if (validarEditar.value == false) {
    console.log(data.value);
    await store.editCosto(
      {
      id: data.value._id, name: name.value, 
      code: code.value, 
      quantity: quantity.value,
      costs:costs.value,
      detail:detail.value,
      date:date.value,
      name:name.value
    });
    ordenarCostos();
    $q.notify({
      type: "positive",
      message: "el costo ha sido actualizado correctamente",
    });
    alert.value = false
    validarEditar.value = true;
  }
}
function costoEditar(info) {
  validarEditar.value = false
  alert.value = true;
  data.value = info
  console.log("e", data.value);
  code.value = data.value.code
  quantity.value = data.value.quantity
  costs.value =data.value.costs
  detail.value=data.value.detail
  date.value=data.value.date
  name.value=data.value.name
}
const columns = [
  { name: "state", label: "Estado", align: "center" },
  {
    label: "Nombre",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },

  { 
    name: "codigo", 
    align: "center", 
    label: "codigo", 
    field: "code" 
  },
  { 
    name: "cantidad", 
    align: "center", 
    label: "cantidad", 
    field: "quantity" 
  },
  {
    name: "valor",
    align: "center",
    label: "valor",
    field: "costs",
  },
  {
    name: "detalles",
    align: "center",
    label: "detalles",
    field: "detail",
  },
  {
    name: "fecha",
    align: "center",
    label: "fecha",
    field: "date",
  },
];

function abrirModal() {
  alert.value=true
}
function cerrarModal() {
  alert.value=false
  vaciarModal()
  validarEditar.value=true
}
</script>


<style>
.cardcos{
  background-color: green ;
}
.input{
  border-radius: 50px;
}
.buton{
  border-radius: 50px;
  margin: 3px 3px;
}
.lotesCard{
  margin-top: 30px;
}
/* .OEE {
  margin-left:8%;
  margin-right:8%;
  margin-top: 1%;
} */
</style>