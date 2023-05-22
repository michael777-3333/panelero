<template>
    
        <div class="justify-center items-center d-flex">
            <div class="row">
                <div class="col-4"></div>
                <div class="col-4">
                    <div class="bgColorEnfasis borderTitle text-center">
                        <h1 class="text-h6">Personas</h1>
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
                                  <q-btn class="botonEditar" @click="personaEditar(props.row)" glossy label="Editar" />
                                </td>

                            </template>
                        </q-table>
                    </div>
                </div>
                <div class="col-3"></div>
            </div>
            <q-dialog v-model="alert">
                <q-card class="bgColorEnfasis">
                <q-card-section>
                <span class="text-black text-h6">Personas</span>
          <q-btn class="bg-red text-white float-right" label="Cerrar" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="my-card d-flex">
            <q-card-section>
              <div class="row">
                <div class="col-5">
                  <q-input v-model="name" label="Nombre" hint="Cliente" :dense="dense" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-select filled v-model="typeIdentification" :options="optionsDocument" label="Tipo de Documento"
                    stack-label :dense="dense" :options-dense="denseOpts" :readonly="readonly" />
                </div>
                <div class="col-5">
                  <q-input v-model="numberIdentification" label="Número de documento" type="number" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="numberPhone" label="Celular" :readonly="readonly" />
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="birthDate" label="Fecha Cumpleaños" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="residenceAddress" label="direccion de residencia" :readonly="readonly" />
                </div>
                <!--  -->
                <div class="col-5">
                  <q-input v-model="medicalInsuranceCompany" label="EPS" :readonly="readonly" />
                </div>
                <div class="col-5"></div>
 
              </div>
            </q-card-section>
            <q-separator/>

            <q-card-actions align="center">
              <q-btn @click="createPersona()" class="q-my-md colorEnfasis">crear Persona</q-btn>
            </q-card-actions>

          </q-card>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>
  
<script setup>
import { ref } from "vue";

import { usePersonasStore } from '../../../stores/personasStore.js'
import { useUsuarioStore } from "../../../stores/usuarioStore";
import { useQuasar } from 'quasar'
import { storeToRefs } from "pinia";

const $q = useQuasar();
const storeUser = useUsuarioStore();
const hasItToken = $q.cookies.has('token')
const store = usePersonasStore() 


let name = ref("");
let numberIdentification = ref("");
let typeIdentification = ref("");
let numberPhone = ref("");
let birthDate = ref("");
let residenceAddress = ref("")
let medicalInsuranceCompany = ref("")
// let estado = ref(null)
let alert = ref(false);
let optionsDocument = ref(['CC', 'TI', 'CE', 'PS', 'DNI', 'NIT', 'PR', 'PEP', 'PPT']);
let visibleColumns = ref(['nombre', 'numero Documento', 'telefono', 'fecha nacimiento' ,"direccion",'EPS',"editar"])
let _id = null;
let rows = ref([]);
const columns = [
  { name: "state", label: "Estado", align: "left" },
  {
    name: "id",
    label: "id",
    field: (row) => row.name,
    format: (val) => `${val}`,
    required: false
  },
  { name: "nombre", align: "left", label: "nombre", field: "name", sortable: true, },
  { name: "numero Documento", label: "numero Documento", field: "numberIdentification" },
  { name: "tipo de identificacion", label: "tipo de identificacion", field: "typeIdentification" },
  { name: "telefono", label: "telefono", field: "numberPhone" },
  { name: "fecha nacimiento", align: "left", label: "fecha nacimiento", field: "birthDate", sortable: true, },
  { name: "direccion", align: "left", label: "direccion", field: "residenceAddress", sortable: true, },
  { name: "EPS", align: "left", label: "EPS", field: "medicalInsuranceCompany", sortable: true, },
  { name: "editar", align: "center", label: "Editar", field: "Editar" },
];

// function personaEditar(info) {
//   alert.value=true
//   data.value=info
//   console.log(data.value);
// }

async function ordenarPersona() {
  const res=await store.getPersona()
  if (res.status == 200) {
    rows.value = res.data.personas
    console.log(rows.value);
  } else if (res.status == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}
ordenarPersona()

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

async function createPersona(){
  console.log( name.value, numberIdentification.value, 
    typeIdentification.value, numberPhone.value,
    birthDate.value,residenceAddress.value,medicalInsuranceCompany.value);
 
  await store.addPersona({
    name:name.value, numberIdentification:numberIdentification.value, 
    typeIdentification:typeIdentification.value, numberPhone:numberPhone.value,
    birthDate:birthDate.value,residenceAddress:residenceAddress.value,medicalInsuranceCompany:medicalInsuranceCompany.value
  })


 
  ordenarPersona()
}

</script>
  
<style scoped>
/*_*/
</style>