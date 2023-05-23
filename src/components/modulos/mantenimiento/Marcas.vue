<template>
        <div class="justify-center items-center d-flex">
            <div class="row">
                <div class="col-4"></div>
                <div class="col-4">
                    <div class="bgColorEnfasis borderTitle text-center">
                        <h1 class="text-h6">Marcas</h1>
                    </div>
                </div>
                <div class="col-4"></div>
            </div>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6 text-center">
                    <div class="q-pa-md q-gutter-sm">
                        <q-btn class="colorEnfasis" @click="alert = true" glossy label="Crear Pedidos" />
                    </div>
                    <div class="q-pa-md">
                        <q-table title="Personas" :rows="rows" :columns="columns" row-key="id" no-data-label="No existen datos!"
                            :visible-columns="visibleColumns">
                            <template v-slot:body-cell-state="props">
                              <td>
                                <q-checkbox v-model="props.row.state" :true-value="1" :false-value="0" @click="editarEstado(props.row)" />
                              </td>
                            </template>

                            <template v-slot:body-cell-editar="props">
                                <td>
                                  <q-btn class="botonEditar" @click="editarMarca(props.row)" glossy label="Editar" />
                                </td>

                            </template>
                        </q-table>
                    </div>
                </div>
                <div class="col-3"></div>
            </div>
            <q-dialog v-model="alert" persistent>
                <q-card class="bgColorEnfasis">
                <q-card-section>
                <span class="text-black text-h6">Marcas</span>
          <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="my-card d-flex">
            <q-card-section>
              <div class="row">
                <div class="col-5">
                  <q-input v-model="name" label="Nombre"  :dense="dense" :readonly="readonly" />
                </div>
                
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="ownerCompany" label="proveedor" :readonly="readonly" />
                </div>
                <!--  -->
                <!-- <div class="col-5">
                  <q-input v-model="createdAt" label="Fecha de compra" type="date" :readonly="readonly" />
                </div> -->
                <div class="col-2"></div>
                <div class="col-5"></div>
 
              </div>
            </q-card-section>
            <q-separator/>

            <q-card-actions align="center">
              <q-btn @click="createMarca()" class="q-my-md colorEnfasis">crear Persona</q-btn>
            </q-card-actions>

          </q-card>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import {useMarcasStore} from '../../../stores/marcasStore.js'
import { useUsuarioStore } from "../../../stores/usuarioStore";
import { storeToRefs } from "pinia";
import { useQuasar } from 'quasar'

const store=useMarcasStore()
const storeUser=useUsuarioStore()
const $q = useQuasar();
const hasItToken = $q.cookies.has('token')

let validarEditar=ref(true)
let data=ref(null)
let alert=ref(false)
let name = ref("");
let ownerCompany = ref("");
let createdAt = ref("");
let visibleColumns = ref(['state','nombre', 'proveedor', 'fecha de compra', 'editar'])
let _id = null;
let rows = ref([]);

const columns = [
  { name: "state", label: "Estado", field:"state", align: "left" },
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
  const res=await store.getMarcas()
  if (res.status == 200) {
    rows.value = res.data.marcas
  } else if (res.status == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}
ordenarMarcas()

async function createMarca() {
  if (name.value=='') {
    $q.notify({
      type: "negative",
      message: "digite el nombre de la marca",
    });
  }else if (ownerCompany.value=='') {
    $q.notify({
      type: "negative",
      message: "digite el proveedor",
    });
  }else if (validarEditar.value==true) 
  {
    await store.addMarca(
      {
        name:name.value, 
        ownerCompany:ownerCompany.value
      })
      ordenarMarcas()
      alert.value=false
      $q.notify({
      type: "positive",
      message: "la marca ha sido agregada correctamente",
      });
      validarEditar.value=true
  }else if (validarEditar.value==false) {
    await store.editMarca(
      { 
        id: data.value._id, name: name.value, 
        name:name.value, 
        ownerCompany:ownerCompany.value
    })
      $q.notify({
        type: "positive",
        message: "la marca ha sido actualizado correctamente",
      });
      alert.value=false
      validarEditar.value = true;
      ordenarMarcas()
  }
}

function editarMarca(info) {
  validarEditar.value=false
  alert.value=true
  data.value=info
  name.value =data.value.name
  ownerCompany.value=data.value.ownerCompany
}

async function editarEstado(props) {
  // console.log("hola");
  console.log(props);
  if (props.state == 1) {
    await store.activarMarca(props);
  } else if (props.state == 0) {
    await store.desactivarMarca(props);
  }
  ordenarMarcas();
}


function cerrarModal() {
  alert.value=false
}

</script>


<style>
</style>