<template>
  <div class="justify-center d-flex">
    <div class="row">
        <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
        <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
          <div v-if="showTable !== false" class="q-ma-xs-md q-ma-lg-sm">
            <q-table title="Lotes" :rows="rows" :columns="columns" row-key="_id">
              <template v-slot:top="props">
                <div class="col-6" align="left"><span style="font-size: 25px;">Lotes</span></div>
                <div class="col-6" align="right">
                  <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="abrirModal()"
                     label="Crear Lote"
                  />
                </div>
              </template>
              
              <template v-slot:body-cell-state="props">
                <td>
                  <q-checkbox v-model="props.row.state" color="green" :true-value="1" :false-value="0" @click="editarEstado(props.row)" />
                </td>
              </template>
              
              <template v-slot:body-cell-editar="props">
                <td>
                  <q-btn class="botonEditar" style="background-color:#029127 ;" @click="loteEditar(props.row)"   >
                    <q-icon style="color: white;" name="edit"></q-icon>
                  </q-btn>
                </td>
              </template>
            </q-table>
          </div>
          <div v-else class="q-ma-xs-md q-ma-lg-sm" style="margin-top: 5%;">
            <q-linear-progress dark query color="green" class="q-mt-sm" />
            <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" />
          </div>
        </div>



        <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>


        <div class="row justify-center">
          <div class="col-10">
            <q-dialog v-model="alert" persistent>
              <q-card>
                <q-card-section class="cardLotes">
                  <div style="color:  white" class="text-h6">Lotes</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="row justify-center">
                    <div class="col-5">
                      <div class="buton">
                        <q-input filled v-model="name" class="input"  label="Nombre" :dense="dense" />
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="buton">
                        <q-input filled v-model="size" class="input"  label="Tamaño" :dense="dense" />
                      </div>
                    </div>
                  </div>
                  
                  <div class="row justify-center q-mt-lg">
                    <div class="col-10">
                      <div class="buton">
                        <q-select filled v-model="granja" class="input"  label="granja" :options="optionsGranja" />
                      </div>
                    </div>
                  </div>
                </q-card-section>
                  
                <q-separator />
                    
                <q-card-actions align="center">
                  <q-btn @click="createAllotment()" style="bottom: green; color: white;" class="q-my-md bg-green" label="Crear Lote" />
                  <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
// import axios from "axios";
// import { useLoteStore } from "../../../stores/lotesStore.js";
// import { useUsuarioStore } from "../../../stores/usuarioStore";
// import { useUsuarioStore, useLoteStore , usefincaStore } from "../../../stores/index.js";
import { showAlert } from '../../../modules/sweetalert.js';
import { farmService, allotmentService} from "../../../api/";

// import { storeToRefs } from "pinia";

import { useQuasar } from "quasar";

// const store = useLoteStore();
// const storeGranja = usefincaStore()
// const stateUser = storeToRefs(storeUser);
const $q = useQuasar();
// const hasItToken = $q.cookies.has('token')

let alert = ref(false);
let granja =ref("")
let name = ref("");
let rows = ref([]);
let size = ref("");
let validarEditar = ref(true)
let createdAt = ref();
let data = ref(null)
let optionsGranja=ref([])
let id = ref(null)

let showTable = ref(false);

function vaciarModal() {
  size.value=''
  name.value=''
  granja.value=''

}

async function ordenarLotes() {
  try {

    let res = {}
    
    res.lotes = await allotmentService.getAllotment();
    res.fincas = await farmService.getFarm();

    // if (res["lotes"].status == 200) {
      rows.value = res['lotes'];
      showTable.value = true;

      if (res['lotes'].length === 0) {
        showAlert('No se encontraron registros', 'info')
        console.log("No se encontraron registros");
      }

    // } else if (res['lotes'].status == 403) {
    //   console.log("No existe token");
    //   showAlert("No existe token", 'info')
    // } else {
    //   console.log(res.status);
    // }

    // if (res['farm'].status == 200) {
      if (res['farm'].length === 0) {
        showAlert('No se encontraron registros', 'info')
        console.log("No se encontraron registros");
      } else {
        optionsGranja.value = res['farm'].map((element) => ({
          label: element.name,
          value: element._id
        }));
      }
    // }

  } catch (error) {
    console.log("Error al obtener las peticiones", error);
  }

}
ordenarLotes();

async function editarEstado(props) {
  console.log("hola");
  console.log(props);
  if (props.state == 1) {
    await store.activarLote(props);
  } else if (props.state == 0) {
    await store.desactivarLote(props);
  }
  ordenarLotes();
}

async function createAllotment() {
  if (name.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el tamaño",
    });
  } else if (granja.value == "") {
    $q.notify({
      type: "negative",
      message: "digite la granja ",
    });
  }else if (size.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el tamaño ",
    });
  }else if (createdAt.value == "") {
    $q.notify({
      type: "negative",
      message: "digite la fecha ",
    });
  }
  else if (validarEditar.value == true) {
    await store.addLote({
      size: size.value, name: name.value, farm: granja.value["value"]
    });
    ordenarLotes();
    console.log(rows.value);
    alert.value = false;
    $q.notify({
      type: "positive",
      message: "el lote ha sido creado correctamente",
    });
  }
  else if (validarEditar.value == false) {
    console.log(data.value);
    await store.editLote({
      id: data.value._id,
      name: name.value, 
      size: size.value, 
      farm: granja.value["value"], 
      createdAt: createdAt.value
    });
    ordenarLotes();
    $q.notify({
      type: "positive",
      message: "el lote ha sido actualizado correctamente",
    });
    alert.value = false
    validarEditar.value = true;
  }
}
function loteEditar(info) {
  validarEditar.value = false
  alert.value = true;
  data.value = info
  console.log("e", data.value);
  size.value = data.value.size
  name.value = data.value.name
  granja.value= info.farm.name
  createdAt.value=data.value.createdAt
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

  { name: "size", align: "center", label: "tamaño", field: "size" },
  {
    name: "createdAt",
    align: "center",
    label: "fecha creacion",
    field: "createdAt",
  },
  {
    name: "granja",
    align: "center",
    label: "granja",
    field: (row)=> row.farm,
    format: (val)=>`${val.name}`
  },
  { name: "editar", align: "center", label: "editar" },
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
/* .cardLotes{
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
} */

/* .tituloLotes {
  background-color: #f39a31;
  border-radius: 30px;

}

.tituloh1 {
  font-size: 20px;
}

.buton {

  background-color: #f8ede2;
  border-radius: 30px;
  margin: 3px 3px;

}

.dialogLotes {
  background-color: #f39a31;
} */
</style>