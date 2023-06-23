<template>
  <div class="row justify-center d-flex items-center  h-2">

      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>

      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">

        <div v-show="MarcaFormr" class="q-ma-xs-md q-ma-lg-sm animated zoomIn">
        <q-card-section class="bgColorEnfasis">
          <span class="text-black text-h6">Marcas</span>

          <q-btn @click="MarcaFormr = !MarcaFormr" class="bg-red text-white float-right" label="X" />
          <!-- <span><br><br></span> -->
        </q-card-section>

        <!-- <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" selection="multiple"
          v-model:selected="selected" :filter="filter" grid hide-header>
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''">
              <q-card bordered flat :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''">
                <q-card-section>
                  <q-checkbox dense v-model="props.selected" :label="props.row.element.name" />
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>

        </q-table> -->
      </div>
       <!-- SECCION SEGUNDA TABLA -->
   
        <div v-if="rows.length > 0" class="q-ma-xs-md q-ma-lg-sm">
          <q-table title="Marcas" :rows="rows" :columns="columns" row-key="id" no-data-label="No existen datos!"
            :visible-columns="visibleColumns">

            <template v-slot:top="props">

              <div class="col-6" align="left"><span style="font-size: 25px;">Marcas</span></div>
              <div class="col-6" align="right">
                <q-btn class="colorEnfasis" style="font-size: 14px; background:#ffffff6b ; color: white;"
                  @click="alert = true" glossy label="Crear Marca" />

              </div>

            </template>

            <template v-slot:body-cell-state="props">
              <td>
                <q-checkbox color="green" v-model="props.row.state" :true-value="1" :false-value="0"
                  @click="editarEstado(props.row)" />
              </td>
            </template>

            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn class="botonEditar" style="background-color: #029127 ;" @click="editarMarca(props.row)" glossy>
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
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center"></div>



    <q-dialog v-model="alert" persistent>
      <q-card class="dialogMarca" style="width: 400px ; height: 270px;">
        <q-card-section class="cardMarcas">
          <div style="color:  white" class="text-h6">Marca</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="marcasCard d-flex">
            <q-card-section>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-5">
                  <div class="buton">

                    <q-input filled v-model="name" class="input" label="Nombre" :dense="dense" />
                  </div>
                  <!-- <q-input v-model="name" label="Nombre" :dense="dense" :readonly="readonly" /> -->
                </div>


                <div class="col-5">
                  <div class="buton">
                    <q-input filled v-model="ownerCompany" class="input" label="proveedor" :dense="dense" />

                  </div>
                  <!-- <q-input v-model="ownerCompany" label="proveedor" :readonly="readonly" /> -->
                </div>
                <!--  -->
                <!-- <div class="col-5">
                  <q-input v-model="createdAt" label="Fecha de compra" type="date" :readonly="readonly" />
                </div> -->



              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="center">
              <q-btn @click="createMarca()" style="background-color: green; color: white; "
                sclass="q-my-md colorEnfasis">Crear Marca</q-btn>
              <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />

            </q-card-actions>

          </q-card>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { markService } from "../../../api/";
import { showAlert } from '../../../modules/sweetalert.js';

import { useQuasar } from 'quasar'
const $q = useQuasar();
// const hasItToken = $q.cookies.has('token')

let validarEditar = ref(true)
let MarcaFormr = ref(false)
let data = ref(null)
let alert = ref(false)
let name = ref("");
let ownerCompany = ref("");
let createdAt = ref("");
let visibleColumns = ref(['state', 'nombre', 'proveedor', 'fecha de compra', 'editar'])
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
  { name: "nombre", align: "left", label: "nombre", field: "name", sortable: true, },
  { name: "proveedor", label: "proveedor", field: "ownerCompany" },
  { name: "fecha de compra", label: "fecha de compra", field: "createdAt" },
  { name: "editar", align: "center", label: "Editar", field: "Editar" },
];


async function ordenarMarcas() {
  try {

    let marca = await markService.getMark();

    rows.value = marca || [];

  } catch (error) {
    console.error("Error al obtener las peticiones", error);
    showAlert('Error al obtener las peticiones', 'error');
  }

}
ordenarMarcas()

async function createMarca() {
  if (name.value == '') {
    showAlert("digite el nombre de la marca")
  } else if (ownerCompany.value == '') {
    $q.notify({
      type: "negative",
      message: "digite el proveedor",
    });
  } else if (validarEditar.value == true) {
    await markService.addMark(
      {
        name: name.value,
        ownerCompany: ownerCompany.value
      })
    ordenarMarcas()
    alert.value = false
    $q.notify({
      type: "positive",
      message: "la marca ha sido agregada correctamente",
    });
    validarEditar.value = true
  } else if (validarEditar.value == false) {
    await markService.editMark(
      {
        id: data.value._id, name: name.value,
        name: name.value,
        ownerCompany: ownerCompany.value
      })
    $q.notify({
      type: "positive",
      message: "la marca ha sido actualizado correctamente",
    });
    alert.value = false
    validarEditar.value = true;
    ordenarMarcas()
  }
}

function editarMarca(info) {
  validarEditar.value = false
  alert.value = true
  data.value = info
  name.value = data.value.name
  ownerCompany.value = data.value.ownerCompany
}

async function editarEstado(props) {
  // console.log("hola");
  // console.log(props);
  if (props.state == 1) {
    await markService.enabledMark(props._id);
  } else if (props.state == 0) {
    await markService.disabledMark(props._id);
  }
  ordenarMarcas();
}


function cerrarModal() {
  alert.value = false
}

</script>


<style scoped>
.cardMarcas {
  background-color: green;

}

.marcasCard {
  margin: 20px;
}

.buton {
  border-radius: 50px;
  margin: 3px 3px;
}</style>