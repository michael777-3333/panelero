<template>
  <div class="justify-center items-center d-flex">
    <div class="row">
      <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
        <div  v-if="rows.length > 0" class="q-ma-xs-md q-ma-lg-sm">
          <q-table title="Personas" :rows="rows" :columns="columns" row-key="id" no-data-label="No existen datos!"
            :visible-columns="visibleColumns">
            <template v-slot:top="props">
              <div class="col-6" align="left"><span style="font-size: 25px;">Personas</span></div>
              <div class="col-6" align="right">
                <q-btn class="" @click="alert = true" style="font-size: 14px; background:#ffffff6b ; color: white;" glossy
                  label="Crear Persona" />

              </div>
            </template>

            <template v-slot:body-cell-state="props">
              <td>
                <q-checkbox v-model="props.row.state" color="green" :true-value="1" :false-value="0" @click="editarEstado(props.row)" />
              </td>
            </template>

            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn  class="botonEditar" style="background-color: green;" @click="personaEditar(props.row)" glossy > 
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
    </div>
    <q-dialog v-model="alert" persistent>
      <q-card class="dialogPersonas" style="width: 1000px ; height: 480px;">
        <q-card-section class="cardPersonas">
          <div style="color: white;" class="text-h6">Personas</div>
          <!-- <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" /> -->
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="personasCard d-flex">
            <q-card-section>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-5">
                  <!-- <q-input v-model="name" label="Nombre" hint="Cliente" :dense="dense" :readonly="readonly" /> -->
                  <div class="buton">

                    <q-input filled v-model="name" class="input"  label="Nombre" :dense="dense" />
                  </div>

                </div>
                
                <div class="col-5">
                  <div class="buton">
                    
                    <q-select filled v-model="typeDocument" :options="optionsDocument" label="Tipo de Documento" stack-label :dense="dense" :options-dense="denseOpts" :readonly="readonly" />
                  </div>
                </div>
                <div class="col-1"></div>
                <div class="col-1"></div>
                <div class="col-5">
                  <!-- <q-input v-model="numberIdentification" label="Número de documento" type="number" :readonly="readonly" /> -->
                  <div class="buton">
                    
                    <q-input filled v-model="numberIdentification" class="input" type="number" label="Número de documento" :dense="dense" />
                  </div>
                </div>

                <div class="col-5">
                  <div class="buton">
                    
                    <q-input filled v-model="numberPhone" class="input"  label="Celular" :dense="dense" />
                  </div>
                  <!-- <q-input v-model="numberPhone" label="Celular" :readonly="readonly" /> -->
                </div>
                <!--  -->
                <div class="col-1"></div>
                <div class="col-1"></div>
                <div class="col-5">

                  <div class="buton">
                    
                    <q-input filled v-model="birthDate" class="input" type="date" label="Fecha de nacimineto" :dense="dense" />
                  </div>
                  <!-- <q-input v-model="birthDate" label="Fecha de nacimineto" type="date" :readonly="readonly" /> -->
                </div>
       
                <div class="col-5">
                  <div class="buton">
                    
                    <q-input filled v-model="residenceAddress" class="input" label="direccion de residencia" :dense="dense" />
                  </div>

                  <!-- <q-input v-model="residenceAddress" label="direccion de residencia" :readonly="readonly" /> -->
                </div>
                <!--  -->
                <div class="col-1"></div>
                <div class="col-1"></div>
                <div class="col-5">
                  <div class="buton">
                    
                    <q-input filled v-model="medicalInsuranceCompany" class="input" label="EPS" :dense="dense" />
                  </div>

                  <!-- <q-input v-model="medicalInsuranceCompany" label="EPS" :readonly="readonly" /> -->
                </div>
                <div class="col-5">
                  <div class="buton">
                    
                    <q-select filled v-model="typePeople" :options="optionsPeople" label="Tipo de Persona" stack-label :dense="dense" :options-dense="denseOpts" :readonly="readonly" />
                  </div>
                </div>
                
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="center">
              <q-btn @click="createPersona()"  style="background-color: green; color: white;" class="q-my-md colorEnfasis">crear Persona</q-btn>
              <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />

            
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
import { storeToRefs } from "pinia";
import { useQuasar } from 'quasar'

const store = usePersonasStore()
const storeUser = useUsuarioStore();
const $q = useQuasar();
const hasItToken = $q.cookies.has('token')

let name = ref("");
let numberIdentification = ref("");
let typeDocument = ref("");
let numberPhone = ref("");
let birthDate = ref("");
let residenceAddress = ref("")
let typePeople=ref('')
let medicalInsuranceCompany = ref("")
let validarEditar = ref(true)
let data = ref(null)
let alert = ref(false);
let optionsDocument = ref(['CC', 'TI', 'CE', 'PS', 'DNI', 'NIT', 'PR', 'PEP', 'PPT']);
let optionsPeople=ref([ 'Trabajador', 'Cliente', 'Dueño Finca'])
let visibleColumns = ref(['state', 'nombre', 'numero Documento', "tipo documento", 'telefono', 'fecha nacimiento', "direccion", 'EPS','tipo de persona', "editar"  ])
let _id = null;
let rows = ref([]);
const columns = [
  { name: "state", label: "Estado", field: "state", align: "center" },
  {
    name: "id",
    label: "id",
    field: (row) => row.name,
    format: (val) => `${val}`,
    required: false
  },
  { name: "nombre", align: "center", label: "nombre", field: "name", sortable: true, },
  { name: "numero Documento", align: "center", label: "numero Documento", field: "numberIdentification" },
  { name: "tipo documento", align: "center", label: "tipo de identificacion", field: "typeDocument" },
  { name: "telefono", label: "telefono",align: "center", field: "numberPhone" },
  { name: "fecha nacimiento", align: "center", label: "fecha nacimiento", field: "birthDate", sortable: true, },
  { name: "direccion", align: "center", label: "direccion", field: "residenceAddress", sortable: true, },
  { name: "EPS", align: "center", label: "EPS", field: "medicalInsuranceCompany", sortable: true, },
  { name: "tipo de persona" , label: "tipo de persona", align:'center', field:'typePeople' },
  { name: "editar", align: "center", label: "Editar", field: "Editar" },
  
];


async function ordenarPersona() {
  const res = await store.getPersona()
  if (res.status == 200) {
    rows.value = res.data.personas
  } else if (res.status == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}
ordenarPersona()

async function createPersona() {
  if (name.value == '') {
    $q.notify({
      type: "negative",
      message: "digite el nombre",
    });
  } else if (numberIdentification.value == '') {
    $q.notify({
      type: "negative",
      message: "digite el numero de identificación",
    });
  }else if (typePeople.value == '') {
    $q.notify({
      type: "negative",
      message: "digite el tipo de persona",
    });
  } else if (typeDocument.value == '') {
    $q.notify({
      type: "negative",
      message: "seleccione el tipo de documento",
    });
  } else if (numberPhone.value == '') {
    $q.notify({
      type: "negative",
      message: "digite el número de telefeno",
    });
  } else if (birthDate.value == '') {
    $q.notify({
      type: "negative",
      message: "digite la fecha de nacimiento",
    });
  } else if (residenceAddress.value == '') {
    $q.notify({
      type: "negative",
      message: "digite la dirección",
    });
  } else if (medicalInsuranceCompany.value == '') {
    $q.notify({
      type: "negative",
      message: "digite la EPS",
    });
  } else if (validarEditar.value == true) {
    await store.addPersona(
      {
        name: name.value,
        numberIdentification: numberIdentification.value,
        typeDocument: typeDocument.value,
        numberPhone: numberPhone.value,
        birthDate: birthDate.value,
        residenceAddress: residenceAddress.value,
        medicalInsuranceCompany: medicalInsuranceCompany.value,
        typePeople: typePeople.value
      })
      console.log(typePeople.value);
    ordenarPersona()
    alert.value = false
    $q.notify({
      type: "positive",
      message: "la persona ha sido agregada correctamente",
    });
    validarEditar.value = true
  } else if (validarEditar.value == false) {
    await store.editPersona(
      {
        id: data.value._id, name: name.value,
        name: name.value,
        numberIdentification: numberIdentification.value,
        typeDocument: typeDocument.value,
        numberPhone: numberPhone.value,
        birthDate: birthDate.value,
        residenceAddress: residenceAddress.value,
        medicalInsuranceCompany: medicalInsuranceCompany.value,
        typePeople: typePeople.value
      })
    $q.notify({
      type: "positive",
      message: "la persona ha sido actualizado correctamente",
    });
    alert.value = false
    validarEditar.value = true;
    ordenarPersona()
  }
}

function personaEditar(info) {
  validarEditar.value = false
  alert.value = true
  console.log(validarEditar.value);
  data.value = info
  console.log(data.value + ' d');
  name.value = data.value.name
  numberIdentification.value = data.value.numberIdentification
  typeDocument.value = data.value.typeDocument
  numberPhone.value = data.value.numberPhone
  birthDate.value = data.value.birthDate
  residenceAddress.value = data.value.residenceAddress
  medicalInsuranceCompany.value = data.value.medicalInsuranceCompany
  typePeople.value=data.value.typePeople
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
    await store.activarPersona(props);
  } else if (props.state == 0) {
    await store.desactivarPersona(props);
  }
  ordenarPersona();
}
</script>
  
<style scoped>

.cardPersonas{
  background-color: green;
}
.personasCard{
  margin-top: 30px;
}
.buton{
  border-radius: 50px;
  margin: 3px 3px;
}
</style>