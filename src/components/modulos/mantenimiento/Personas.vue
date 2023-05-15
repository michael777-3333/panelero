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
                        <q-btn class="colorEnfasis" @click="addOrder()" glossy label="Crear Pedidos" />
                    </div>
                    <div class="q-pa-md">
                        <q-table title="Pedidos" :rows="rows" :columns="columns" row-key="id" no-data-label="No existen datos!"
                            :visible-columns="visibleColumns">
                            <template v-slot:body-cell-editar="props">
                                <td>
                                    <q-btn class="botonEditar" @click="editOrder(props.row)" glossy label="Editar" />
                                </td>

                            </template>
                        </q-table>
                    </div>
                </div>
                <div class="col-3"></div>
            </div>
            <q-dialog v-model="modalPersonas">
                <q-card class="bgColorEnfasis">
                <q-card-section>
          <!-- <h6 class="text-black">Pedidos</h6> -->
                <span class="text-black text-h6">Personas</span>
          <!-- <div class="text-black">Pedidos</div> -->

          <q-btn @click="modalPersonas = !modalPersonas" class="bg-red text-white float-right" label="Cerrar" />
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
                  <!-- <q-input v-model="typeIdentification" label="Tipo de Documento" /> -->
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
                <!--  -->
                <!-- <div class="col-5">
                  <q-input v-model="cantidad" label="Cantidad de panela" type="number" :readonly="readonly" />
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                  <q-input v-model="direccionEnvio" label="Dirección de envio" :readonly="readonly" />
                </div> -->
              </div>
            </q-card-section>
            <q-separator/>

            <q-card-actions align="center">
              <q-btn class="q-my-md colorEnfasis">
                <span v-if="isAdd == true" @click="createOrder()">Crear Pedido</span>
                <span v-else               @click="changeStatus()">Modificar Pedido</span>
              </q-btn>
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
import { useQuasar } from 'quasar'


const $q = useQuasar()

// or pass in options also:
// $q.cookies.set('cookie_name', cookie_value, options)



// $q.localStorage.set("key", "value")
// console.log($q.localStorage.getItem("token"));
// const value = $q.localStorage.getItem(key)

// $q.sessionStorage.set(key, value)
// const otherValue = $q.sessionStorage.getItem(key)

const hasItToken = $q.cookies.has('token')

const store = usePersonasStore()

let name = ref("");
let numberIdentification = ref("");
let typeIdentification = ref("");
let numberPhone = ref("");
let birthDate = ref("");
let residenceAddress = ref("")
let medicalInsuranceCompany = ref("")
let estado = ref(null)
// let cantidad = ref("")
// let direccionEnvio = ref("")
// let optionsStatus = ref(['Proceso', 'Entregado', 'Cancelado', 'Realizado']);
let optionsDocument = ref(['CC', 'TI', 'CE', 'PS', 'DNI', 'NIT', 'PR', 'PEP', 'PPT']);


let visibleColumns = ref(['nombre', 'cantidad', 'numeroDocumento', 'editar'])
let _id = null;
let isAdd = ref(true);
let readonly = ref(false);
let dense = ref(!true);
let denseOpts = ref(true);
let modalPersonas = ref(false);
let rows = ref([]);
const columns = [
  {
    name: "id",
    // required: true,
    label: "id",
    // align: "left",
    field: (row) => row._id,
    format: (val) => `${val}`,
    // sortable: true,
    // sortOrder: 'ad', // or 'da'
    required: false
  },

  { name: "nombre", align: "left", label: "Cliente", field: "customerName", sortable: true, },
  { name: "cantidad", label: "Cantidad", field: "quantityOfPanela" },
  { name: "numeroDocumento", label: "Estado", field: "orderStatus" },
  { name: "editar", align: "center", label: "Editar", field: "Editar" },
];


function addOrder() {
  // $q.localStorage.removeItem("token")

  modalPersonas.value = isAdd.value = true
  readonly.value = false
}

async function getOrders() {
  if (hasItToken) {
    store.getToken($q.cookies.get('token'))
  }
  const res = await store.getPersona()
  if (res.status == 200) {
    rows.value = res.data.persona
  } else if (res.status == 404) {
    console.log("No existen datos");
  } else {
    console.log(res.status);
  }
}

getOrders();

async function createOrder() {
  await store.addPersona({
    name: name.value,
    residenceAddress: residenceAddress.value,
    numberIdentification: numberIdentification.value,
    typeIdentification: typeIdentification.value,
    birthDate: birthDate.value,
    // orderStatus:   estado.value,
    numberPhone: numberPhone.value,
    medicalInsuranceCompany: medicalInsuranceCompany.value,
    // sendAddress:  direccionEnvio.value,

    
  });
  console.log();

  getOrders();
  modalPersonas.value = !modalPersonas.value;
}

function editOrder(paramass) {
  modalPersonas.value = !modalPersonas.value
  isAdd.value = false
  readonly.value = true
  _id = paramass._id
  numberPhone.value = paramass.phoneNumber
  name.value = paramass.customerName
  residenceAddress.value = paramass.descriptionOfPanela
  direccionEnvio.value = paramass.sendAddress
  birthDate.value = paramass.email
  estado.value = paramass.orderStatus
  numberIdentification.value = paramass.documentNumber
  medicalInsuranceCompany.value = paramass.preferencesOfPanela
  typeIdentification.value = paramass.documentType
}

async function changeStatus() {
  await store.editPersona({
    id: _id,
    orderStatus: estado.value,
  });

  getOrders();
  modalPersonas.value = !modalPersonas.value;
}

</script>
  
<style scoped>
/*_*/
</style>