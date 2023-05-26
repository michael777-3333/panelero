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
              <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="alertt = true"
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

  <q-dialog v-model="alertt">
    <q-card class="dialog1" style="background-color: #029127">
      <q-card-section>
        <div class="colorEnfasis">Nuevo Costo</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-card class="my-card d-flex" style="width: 100%">
          <q-card-section class="cardse">
            <div class="row">
              <div class="col-6">
                <div class="">
                  <div class="boton2">
                    <q-input v-model="nameC" label="Nombre" />
                  </div>
                </div>
                <div class="">
                  <div class="boton2">
                    <q-input v-model="codigoC" label="Codigo" />
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="">
                  <div class="boton2">
                    <q-input v-model="cantidadC" label="Cantidad" />
                  </div>
                </div>
                <div class="">
                  <div class="boton2">
                    <q-input v-model="costoC" label="Costo" />
                  </div>
                </div>
              </div>
            </div>
            <div class="boton2">
              <q-input v-model="costoC" label="Costo" />
            </div>
            <div class="fecha_costo q-pa-md" style="max-width: 370px">
              <q-input filled v-model="dateC" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="dateC">
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
            <q-btn @click="createUser()" style="color: #f39a31" class="q-my-md" label="Guardar Costo" />
          </q-card-actions>
          <q-card-actions align="center"> </q-card-actions>
        </q-card>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" class="boo" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>

let estado = ref(null)


function editOrder({ name, codigo,date,cantidad,costo }) {
  modalcoin.value = !modalcoin.value
  isAdd.value = false
  readonly.value = true
  id = _id
  cantidad.value = quantityOfPanela
  celularMFa.value = phoneNumber
  clienteMFa.value = customerName
  detalles.value = descriptionOfPanela
  direccionEnvio.value = sendAddress
  emailMFa.value = email
  estado.value = orderStatus
  numeroDocumentoMFa.value = documentNumber
  preferencias.value = preferencesOfPanela
  tipoDocumentoMFa.value = documentType
}




import { ref } from "vue";
let alertt = ref(false);
let nameC = ref('')
let codigoC = ref('')
let dateC = ref('')
let cantidadC = ref('')
let costoC = ref('')

let users = ref([])
const rows = ref([
  {
    name: "Tractor",
    codigo: "5wf5515wq142",
    date: "2019/02/01",
    cantidad: 3,
    costo: "500.000.000",
  },
  {
    name: "Avion",
    codigo: "5w142",
    date: "2019/02/01",
    cantidad: 1,
    costo: "1.500.000.000",
  },
])

function createUser() {
  users.value.push({
    name: nameC.value,
    codigo: codigoC.value,
    date: dateC.value,
    cantidad: cantidadC.value,
    costo: costoC.value,
  });

  rows.value.push(users.value[0]);
  users.value = [];

  // console.log(rows);
  modalInv.value = !modalInv.value;
}

const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "codigo", label: "Codigo", field: "codigo" },
  { name: "cantidad", label: "Cantidad", field: "cantidad" },
  { name: "date", label: "Fecha", field: "date" },
  { name: "costo", label: "Costo", field: "costo" },
];

let modalInv = ref(false);
let confirm = ref(false);
let prompt = ref(false);

let address = ref("");
</script>
<style lang="sass">

</style> 


