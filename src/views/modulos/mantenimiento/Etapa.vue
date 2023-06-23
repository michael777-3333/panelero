<template>
    <div class="justify-center items-center d-flex">
        <div class="row">
            <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
            <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">

                <div class="q-ma-xs-md q-ma-lg-sm">
                    <q-table class="paddingTabla" title="Etapas" :rows="rows" :columns="columns" row-key="name"
                    :visible-columns="visibleColumns">
                        <template v-slot:top="props">
                            <div class="col-6" align="left"><span style="font-size: 25px;">Etapas</span></div>
                            <div class="col-6" align="right">
                                <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;"
                                    @click="abrirModal()" glossy label="Crear Etapa" />
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
                                <q-btn class="botonEditar" style="background-color:#029127 ;" @click="etapaEditar(props.row)"
                                    glossy>
                                    <q-icon style="color: white;" name="edit"></q-icon>
                                </q-btn>
                            </td>
                        </template>
                    </q-table>
                </div>


                <div class="q-ma-xs-md q-ma-lg-sm" style="margin-top: 5%;">
                </div>
            </div>
        </div>

        <q-dialog v-model="fullWidth" persistent>
            <q-card class="dialogEtapas">
                <q-card-section class="cardEtapas">
                    <div style="color:  black" class="text-h6">Etapas</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-card class="etapasCard d-flex">
                        <div style="color:  black; text-align: center;" class="text-h6">Datos para la etapa</div>

                        <q-card-section>
                            <div class="row ">
                                <div class="col-1"></div>
                                <div class="col-5 input">
                                    <div class="" style="width: 400px;">
                                        <q-input filled v-model="nombre" label="Nombre"/>
                                    </div>
                                </div>
                                <div class="col-5 input">

                                    <div class="" style="width: 400px;">
                                        <q-select filled v-model="lotes" label="Lotes"  :options="optionsLote" />

                                    </div>

                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-card-section>


                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn style="color: black;" @click="createEtapa()"> Editar Etapa </q-btn>
                    <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
    
<script setup>
import { ref } from 'vue';
import { phaseService, allotmentService } from "../../../api/";
import { showAlert } from '../../../modules/sweetalert.js';


let fullWidth = ref(false)
let nombre =ref('')
let lotes=ref("")
let rows = ref([]);
let data =ref()
let optionsLote=ref([])
let validarEditar=ref(true)
function abrirModal() {
    fullWidth.value = true
}
let visibleColumns =ref(['state', 'nombre', 'lotes', 'editar' ])

const columns = [
{ 
    name: "state",
    label: "Estado",
    align: "center" 
},
{
    name:'nombre',
    label: "Nombre",
    align: "center",
    field: 'name',
    sortable: true,
},
{
    name: "lotes",
    align: "center",
    label: "lotes",
    field: (row)=> row.allotment,
    format:(val)=> {
        if (val) return val.name
        return ''
    }
},
// {
//     name: "estado",
//     align: "center",
//     label: "estado",
//     field: (row)=> row.process[0],
//     format: (val)=> `${val.stateActivity}`
// },
// {
//     name: "activity",
//     align: "center",
//     label: "activity",
//     field: (row)=> row.process[0],
//     format: (val)=> `${val.activity}`
// },
  { name: "editar", align: "center", label: "editar" },
];

async function ordenarEtapas() {
    try {

        let etapa = await phaseService.getPhase()
        let lote = await allotmentService.getAllotment()

        rows.value = etapa || [];

        if (lote.length > 0) {

            optionsLote.value = lote.map((element) => ({
                label: element.name,
                value: element._id
            }));
        }

    } catch (error) {
    console.error("Error al obtener las peticiones", error);
    showAlert('Error al obtener las peticiones', 'error');
  }
}

ordenarEtapas()

async function createEtapa() {
    abrirModal()
    if (nombre.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el nombre",
    });
  } else if (lotes.value == "") {
    $q.notify({
      type: "negative",
      message: "digite el lote",
    });
  }
    else if (validarEditar.value==true) {
        await phaseService.addPhase({
        name: nombre.value,
        allotment:lotes.value["value"]
    })
    ordenarEtapas()
    }else if (validarEditar==false) {
        await phaseService.editPhase({
            id: data.value._id,
            name: nombre.value,
            allotment:lotes.value["value"]
        })
    ordenarEtapas();
    }
    
}
 async function etapaEditar(info) {
    fullWidth.value = true
    validarEditar=false
    data.value =info
    console.log(data.value);
    nombre.value = data.value.name
    lotes.value= info.allotment.name
 }
 async function editarEstado(props) {
    if (props.state==1) {
        await phaseService.enabledPhase(props._id)
    }else if (props.state==0) {
        await phaseService.disabledPhase(props._id)
    }
    ordenarEtapas();
 }



</script>
    
    
<style scoped>
.cardEtapas {
    background-color: green;
}

.procesosCard {
    margin-top: 20px;
}

.etapasCard {
    margin-top: 20px;
}

.input {
    margin: 4px;
    display: flex;
    justify-content: center;
}
</style>