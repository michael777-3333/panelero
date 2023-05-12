<template>
  <div class="justify-center items-center d-flex">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="tituloLotes text-center">
          <h1 class="tituloh1 text-h6">Lotes</h1>
        </div>
      </div>
      <div class="col-4"></div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="q-pa-md">
          <q-table
            class="paddingTabla"
            title="Lotes"
            :rows="rows"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:body-cell-state="props">
              <td>
                <q-checkbox
                  v-model="props.row.state"
                  :true-value="1"
                  :false-value="0"
                  @click="editarEstado(props.row)"
                />
              </td>
            </template>

            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn
                  class="botonEditar"
                  @click="loteEditar(props.row)"
                  glossy
                  label="Editar"
                />
              </td>
            </template>
          </q-table>
        </div>
      </div>
      <div class="col-3"></div>
      <div class="contenedorBoton q-pa-md q-gutter-sm">
        <q-btn
          label="Crear usuario"
          style="color: #f39a31"
          @click="alert = true"
        />
      </div>
      <q-dialog v-model="alert">
        <q-card class="dialogLotes">
          <q-card-section>
            <div style="color: #f39a31" class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-card class="my-card d-flex" style="width: 100%">
              <q-card-section>
                <div class="row">
                  <div class="col-5">
                    <div class="buton">
                      <q-input v-model="name" label="nombre" />
                    </div>
                  </div>
                  <div class="col-2"></div>
                  <div class="col-5">
                    <div class="buton">
                      <q-input v-model="size" label="tamaño" />
                    </div>
                  </div>
                </div>
                <div class="row d-flex q-m-sm">
                  <div class="col-5">
                    <div class="buton">
                      <q-input v-model="owner" label="dueño" />
                    </div>
                  </div>
                  <div class="col-2"></div>
                  <div class="col-5">
                    <div class="buton">
                      <q-input v-model="createdAt" label="fecha" />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="center">
                <q-btn
                  @click="createAllotment()"
                  style="color: #f39a31"
                  class="q-my-md"
                  label="Crear Usuario"
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
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import axios from "axios";
import { useLoteStore } from "../../../stores/lotesStore.js";
import { useUsuarioStore } from "../../../stores/usuarioStore";
import { storeToRefs } from "pinia";

import { useQuasar } from "quasar";

const store = useLoteStore();
const storeUser = useUsuarioStore();
const stateUser = storeToRefs(storeUser);
const $q = useQuasar();
let alert = ref(false);
let name = ref("");
let rows = ref([]);
let size = ref("");
let owner = ref("");
let validarEditar=ref(false)
let createdAt = ref("");
let data = ref(null)

async function ordenarLotes() {
  $q.localStorage.set("token", store.token)
    // store.getToken(stateUser.token.value);
    const res = await store.getLote();
    console.log(res);
    if (res.status == 200) {
      rows.value = res.data.lotes;
    } else if (res.response == 404) {
      console.log("No existen datos");
    } else {
      console.log(res.status);
    }
}

// await Promise.all([store.getLote()]).then(response => rows.value = response[0].data.lotes);

// store.getToken(storeUser.token);

ordenarLotes();

async function editarEstado(props) {
  console.log("hola");
  console.log(props);
  if (props.state == 0) {
    await store.activarLote(props);
  } else if (props.state == 1) {
    await store.desactivarLote(props);
  }
  ordenarLotes();
}

async function createAllotment() {
  // if (name.value =='') {
  //   $q.notify({
  //     type: 'negative',
  //     message: 'digite el nombre'
  // })
  // }

  if (size.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el tamaño",
    });
  } else if (owner.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el dueño ",
    });
  } 
  // else if (createdAt.value == "") {
  //   $q.notify({
  //     type: "negative",
  //     message: "digite la fecha",
  //   });
  // } 
  else if (validarEditar.value==true) {
    await store.addLote({size: size.value, owner: owner.value, createdAt: createdAt.value,});
    ordenarLotes();
    console.log(rows.value);
    alert.value = false;
    $q.notify({
      type: "positive",
      message: "el lote ha sido creado correctamente",
    });
  }else if (validarEditar.value==false) {
    await store.putLote({size: size.value, owner: owner.value,});
      ordenarLotes();
      $q.notify({
      type: "positive",
      message: "el lote ha sido actualizado correctamente",
    });
    validarEditar.value = true;
  }
}

function loteEditar(data){
  validarEditar.value=false
  alert.value = true;
  data.value=data
  console.log(data.value);
  size.value =data.value.size
  owner.value =data.value.owner

}

const columns = [
  { name: "state", label: "Estado", align: "left" },
  {
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },

  { name: "size", align: "left", label: "tamaño", field: "size" },
  { name: "owner", align: "left", label: "dueño", field: "owner" },
  {
    name: "createdAt",
    align: "left",
    label: "fecha creacion",
    field: "createdAt",
  },
  { name: "editar", align: "left", label: "editar" },
];
</script>
  
  <style>
.tituloLotes {
  /* width: 10px; */
  /* height: 10px; */
  background-color: #f39a31;
  border-radius: 30px;
  /* width: 400px; */
}

.tituloh1 {
  font-size: 20px;
}

/* .my-card{
      background-color: #f3993181;
      border-radius: 30px;
      margin-left: 60%;
  } */
.buton {
  /* margin-top: 5px; */
  background-color: #f8ede2;
  border-radius: 30px;
  margin: 3px 3px;
  /* height: 40px; */
}

.dialogLotes {
  background-color: #f39a31;
}

/* .my-card-width {
    max-width: 600px;
  } */

/* .contenedorBoton {
    margin-left: 44%;
  } */

/*  */
</style>