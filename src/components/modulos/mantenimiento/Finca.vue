<template>
  <div class="justify-center items-center d-flex">
    <div class="row">
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
        <div class="q-pa-md">
          <q-table title="fincas" :rows="rows" :columns="columns" row-key="id" no-data-label="No existen datos!"
            :visible-columns="visibleColumns">
            <template v-slot:top="props">
              <div class="col-6" align="left"><span style="font-size: 25px;">Finca</span></div>
              <div class="col-6" align="right">
                <q-btn class="" @click="alert = true" style="font-size: 14px; background:#ffffff6b ; color: white;" glossy
                  label="Crear Finca" />

              </div>
            </template>

            <template v-slot:body-cell-state="props">
              <td>
                <q-checkbox v-model="props.row.state" :true-value="1" :false-value="0" @click="editarEstado(props.row)" />
              </td>
            </template>

            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn class="botonEditar" @click="fincaEditar(props.row)" glossy label="Editar" />
              </td>

            </template>
          </q-table>
        </div>
      </div>
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
    </div>
    <q-dialog v-model="alert" persistent>
      <div class="row">

      </div>
      <q-card class="dialogLotes" style="width: 1000px ; height: 380px;">
        <q-card-section class="cardLotes">
          <div style="color:  white" class="text-h6">Lotes</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="lotesCard d-flex ">
            <q-card-section>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-5">
                  <div class="buton">
                    <q-input filled v-model="name" class="input" label="Nombre" :dense="dense" />

                    <!-- <q-input v-model="name" label="nombre" /> -->
                  </div>
                </div>
                <!-- <div class="col-"></div> -->
                <div class="col-5">
                  <div class="buton">
                    <!-- <q-input filled v-model="ownerFarm" class="input" label="dueno" :dense="dense" /> -->
                    <!-- <q-input v-model="size" label="tamaño" /> -->
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="center">
              <q-btn @click="createfinca()" style="bottom: green; color: white;" class="q-my-md bg-green"
                label="Crear Finca" />
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
</template>

<script setup>
import { ref } from "vue";

import { usefincaStore } from '../../../stores/fincaStore.js'
import { useUsuarioStore } from "../../../stores/usuarioStore";
import { storeToRefs } from "pinia";
import { useQuasar } from 'quasar'

const store = usefincaStore()
const storeUser = useUsuarioStore();
const $q = useQuasar();
const hasItToken = $q.cookies.has('token')

let name = ref("");
let ownerFarm = ref("");
let arrayjefes=ref([])
let validarEditar = ref(true)
let data = ref(null)
let alert = ref(false);
let visibleColumns = ref(['state', 'nombre', 'dueno finca'])
let _id = null;
let rows = ref([]);
const columns = [
  { name: "state", label: "Estado", field: "state", align: "left" },
  {
    name: "id",
    label: "id",
    field: (row) => row.name,
    format: (val) => `${val}`,
    required: false
  },
  { name: "nombre", align: "left", label: "nombre", field: "name", sortable: true,},
  { name: "dueno finca", label: "dueno finca",  field: row => row.ownerFarm, format: (val) => `${val.name}`,},
  { name: "editar", align: "center", label: "Editar", field: "Editar"},
];


async function ordenarfinca(){
  const res = await store.getfinca()
  if (res.status == 200) {
    console.log(res.data.granjas);

    rows.value = res.data.granjas
    console.log(rows.value);
    getOwner()
  } else if (res.status == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}
ordenarfinca()

async function createfinca() {
  if (name.value == '') {
    $q.notify({
      type: "negative",
      message: "digite el nombre",
    });
  } 
//   else if (ownerFarm.value == '') {
//     $q.notify({
//       type: "negative",
//       message: "digite el numero de identificación",
//     });
// } 
else if (validarEditar.value == true) {
    await store.addfinca(
      {
        name: name.value,
        // ownerFarm: ownerFarm.value,

      })
    ordenarfinca()
    alert.value = false
    $q.notify({
      type: "positive",
      message: "la finca ha sido agregada correctamente",
    });
    validarEditar.value = true
  } else if (validarEditar.value == false) {
    await store.editfinca(
      {
        id: data.value._id, name: name.value,
        name: name.value,
        // ownerFarm: ownerFarm.value,

      })
    $q.notify({
      type: "positive",
      message: "la finca ha sido actualizado correctamente",
    });
    alert.value = false
    validarEditar.value = true;
    ordenarfinca()
  }
}

function fincaEditar(info) {
  validarEditar.value = false
  alert.value = true
  console.log(validarEditar.value);
  data.value = info
  console.log(data.value + ' d');
  name.value = data.value.name
  // ownerFarm.value = data.value.ownerFarm

}

function cerrarModal() {
  console.log(validarEditar.value);
  alert.value = false
  validarEditar.value = true
  console.log(validarEditar.value);
}

async function editarEstado(props) {
  // console.log("hola");
  console.log(props);
  if (props.state == 1) {
    await store.activarfinca(props);
  } else if (props.state == 0) {
    await store.desactivarfinca(props);
  }
  ordenarfinca();
}

function getOwner(arrayOwner) {


}
</script>

<style scoped>/*_*/</style>