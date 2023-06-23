<template>
    <div class="justify-center d-flex">
        <div class="row">
            <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
            <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
                <q-table title="Bodegas" :rows="rows" :columns="columns" row-key="id" no-data-label="No existen datos!"
                    :visible-columns="visibleColumns">

                    <template v-slot:top="props">

                        <div class="col-6" align="left"><span style="font-size: 25px;">Bodega</span></div>
                        <div class="col-6" align="right">
                            <q-btn class="colorEnfasis" style="font-size: 14px; background: #ffffff6b; color: white;"
                                @click="alert = true" glossy label="Crear Bodega" />

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
                            <q-btn class="botonEditar" style="background-color: green;" @click="editarBodega(props.row)" glossy  >
                                <q-icon style="color: white;" name="edit"> </q-icon>
                            </q-btn>
                        </td>

                    </template>
                </q-table>
            </div>
            <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
        </div>

        <q-dialog v-model="alert" persistent>
            <q-card class="bgColorEnfasis dialogCard" style="width: 1000px ; height: 380px;">
                <q-card-section class="cardBodegas">
                    <span class="text-white text-h6">Bodegas</span>
                    <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-card class="bodegasCard d-flex">
                        <q-card-section>
                            <div class="row">
                                <div class="col-1"></div>
                                <div class="butonBodegas col-5">

                                    <q-input filled v-model="name" class="input" label="Nombre" />

                                    <!-- <q-input v-model="name" label="Nombre"  :readonly="readonly" /> -->
                                </div>

                                <div class="butonBodegas col-5">
                                    <q-input filled v-model="size" class="input" label="Tamaño" />

                                </div>
                                <div class="col-1"></div>
                                <div class="col-1"></div>
                                <div class="col-1"></div>
                                <div class="butonBodegas col-5">
                                    <q-input filled v-model="farm" class="input" label="Finca" />
                                    <!-- <q-input v-model="farm" label="finca" :readonly="readonly" /> -->
                                </div>

                            </div>
                        </q-card-section>
                        <q-separator />

                        <q-card-actions align="center">
                            <q-btn @click="createBodega()" style="background-color: green; color: white;" class="q-my-md colorEnfasis">crear Bodega</q-btn>

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
import { storeService, farmService } from "../../../api/";
import { showAlert } from '../../../modules/sweetalert.js';

let validarEditar = ref(true)
let data = ref(null)
let alert = ref(false)
let name = ref("");
let size = ref("");
let farm = ref("");
let visibleColumns = ref(['state', 'nombre', 'tamaño', 'finca', 'editar'])
let _id = null;
let optionsFinca=ref([])
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
    { name: "tamaño", label: "tamaño", field: "size" },
    { name: "finca", label: "finca",
    field: (row) => row.farm,
    format: (val) => {
        if (val) {
            return val.name
        } else {
            return "nada"
        }
    },},
    // { name: "editar", align: "center", label: "Editar", field: (row)=> row.farm, format: (val)=> `${val.name}` },
];



async function ordenarBodega() {
    try {
        
        let bodega = await storeService.getStore()
        let finca = await farmService.getFarm()

        rows.value = bodega || [];

        if (finca.length > 0) {

            optionsFinca.value = finca.granjas.map((element) => ({
                label: element.name,
                value: element._id,
            }))
        }

    } catch (error) {
    console.error("Error al obtener las peticiones", error);
    showAlert('Error al obtener las peticiones', 'error');
  }
}
ordenarBodega()

// console.log(store.getBodega())

async function createBodega() {
    if (name.value == '') {
            showAlert('digite el nombre de la Bodega');
    } else if (size.value == '') {
            showAlert('digite el proveedor');
    } else if (validarEditar.value == true) {
        await storeService.addStore(
            {
                name: name.value,
                size: size.value,
                farm: farm.value
            })
        ordenarBodega()
        alert.value = false
            showAlert('la Bodega ha sido agregada correctamente', 'info');
        validarEditar.value = true
    } else if (validarEditar.value == false) {
        await storeService.editStore(
            {
                id: data.value._id,
                name: name.value,
                size: size.value,
                farm: farm.value
            })
            showAlert('la Bodega ha sido actualizado correctamente', 'info');
        alert.value = false
        validarEditar.value = true;
        ordenarBodega()
    }
}

function editarBodega(info) {
    validarEditar.value = false
    alert.value = true
    data.value = info
    name.value = data.value.name
    size.value = data.value.size
    farm.value = data.value.farm
}

async function editarEstado(props) {
    // console.log("hola");
    console.log(props);
    if (props.state == 1) {
        await storeService.enabledStore(props._id);
    } else if (props.state == 0) {
        await storeService.disabledStore(props._id);
    }
    ordenarBodega();
}


function cerrarModal() {
    alert.value = false
}

</script>


<style>
.cardBodegas {
    background-color: green;
}

.bodegasCard {
    margin-top: 30px;
}

.butonBodegas {
    border-radius: 50px;
    margin: 3px 3px;
}</style>