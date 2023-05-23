<template>
    <div class="justify-center d-flex">
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
                <div class="bgColorEnfasis borderTitle text-center">
                    <h1 class="text-h6">Bodega</h1>
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
                    <q-table title="Bodegas" :rows="rows" :columns="columns" row-key="id" no-data-label="No existen datos!"
                        :visible-columns="visibleColumns">
                        <template v-slot:body-cell-state="props">
                            <td>
                                <q-checkbox v-model="props.row.state" :true-value="1" :false-value="0"
                                    @click="editarEstado(props.row)" />
                            </td>
                        </template>

                        <template v-slot:body-cell-editar="props">
                            <td>
                                <q-btn class="botonEditar" @click="editarBodega(props.row)" glossy label="Editar" />
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
                    <span class="text-black text-h6">Bodegas</span>
                    <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-card class="my-card d-flex">
                        <q-card-section>
                            <div class="row">
                                <div class="col-5">
                                    <q-input v-model="name" label="Nombre" :dense="dense" :readonly="readonly" />
                                </div>

                                <div class="col-2"></div>
                                <div class="col-5">
                                    <q-input v-model="size" label="tamaño" :readonly="readonly" />
                                </div>
                                <div class="col-2"></div>
                                <div class="col-5">
                                    <q-input v-model="farm" label="finca" :readonly="readonly" />

                                </div>

                            </div>
                        </q-card-section>
                        <q-separator />

                        <q-card-actions align="center">
                            <q-btn @click="createBodega()" class="q-my-md colorEnfasis">crear Persona</q-btn>
                        </q-card-actions>

                    </q-card>
                </q-card-section>

            </q-card>
        </q-dialog>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { useBodegaStore } from '../../../stores/BodegaStore.js'
import { useUsuarioStore } from "../../../stores/usuarioStore";
import { storeToRefs } from "pinia";
import { useQuasar } from 'quasar'

const store = useBodegaStore()
const storeUser = useUsuarioStore()
const $q = useQuasar();
const hasItToken = $q.cookies.has('token')

let validarEditar = ref(true)
let data = ref(null)
let alert = ref(false)
let name = ref("");
let size = ref("");
let farm = ref("");
let visibleColumns = ref(['state', 'nombre', 'tamaño', 'finca', 'editar'])
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
    { name: "tamaño", label: "tamaño", field: "size" },
    { name: "finca", label: "finca", field: "farm" },
    { name: "editar", align: "center", label: "Editar", field: "Editar" },
];


async function ordenarBodega() {
    const res = await store.getBodega()
    if (res.status == 200) {
        console.log(res.data);
        rows.value = res.data.bodegas
        console.log(rows.value);
    } else if (res.status == 404) {
        console.log("No existen datos");
    } else {
        console.log(res.status);
    }
}
ordenarBodega()

async function createBodega() {
    if (name.value == '') {
        $q.notify({
            type: "negative",
            message: "digite el nombre de la Bodega",
        });
    } else if (size.value == '') {
        $q.notify({
            type: "negative",
            message: "digite el proveedor",
        });
    } else if (validarEditar.value == true) {
        await store.addBodega(
            {
                name: name.value,
                size: size.value,
                farm: farm.value
            })
        ordenarBodega()
        alert.value = false
        $q.notify({
            type: "positive",
            message: "la Bodega ha sido agregada correctamente",
        });
        validarEditar.value = true
    } else if (validarEditar.value == false) {
        await store.editBodega(
            {
                id: data.value._id,
                name: name.value,
                size: size.value,
                farm: farm.value
            })
        $q.notify({
            type: "positive",
            message: "la Bodega ha sido actualizado correctamente",
        });
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
    farm.value= data.value.farm
}

async function editarEstado(props) {
    // console.log("hola");
    console.log(props);
    if (props.state == 1) {
        await store.activarBodega(props);
    } else if (props.state == 0) {
        await store.desactivarBodega(props);
    }
    ordenarBodega();
}


function cerrarModal() {
    alert.value = false
}

</script>


<style></style>