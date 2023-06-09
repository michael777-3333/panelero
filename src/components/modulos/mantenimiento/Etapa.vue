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
                                <q-btn class="botonEditar" style="background-color:#029127 ;" @click="loteEditar(props.row)"
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
                                        <q-select filled v-model="lotes" label="Lotes" multiple :options="ArrayLotes" />

                                    </div>

                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                    <q-card class="procesosCard d-flex">
                        <div style="color: black; text-align: center;" class="text-h6"> Datos para el proceso</div>
                        <q-card-section>
                            <div class="row">
                                <div class="col-1"></div>
                                <div class="col-5 input">
                                    <div class="" style="width: 400px;">
                                        <q-input filled v-model="activity" label="Actividad"   />
                                    </div>
                                </div>
                                <div class="col-5 input">
                                    <div class="" style="width: 400px;">
                                        <div class="q-gutter-md">
                                            <q-select filled v-model="personas" label="Personal" multiple :options="arrayPersonas" />
                                        </div>
                                    </div>

                                </div>


                                <div class="col-1"></div>
                                <div class="col-5 input">
                                    <div class="" style="width: 400px;">

                                        <q-select filled v-model="inventario" label="Inventario" multiple :options="arrayInventario" />

                                    </div>
                                </div>

                                <div class="col-5 input">
                                    <div class="" style="width: 400px;">
                                        <q-input filled v-model="estado" label="Estado"   />
                                    </div>
                                </div>

                            </div>

                        </q-card-section>
                    </q-card>
                </q-card-section>


                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn  @click="createEtapa()"> </q-btn>
                    <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
    
<script setup>
import { ref } from 'vue';
// import { usePersonasStore } from '../../../stores/personasStore.js'
// import { useUsuarioStore } from "../../../stores/usuarioStore.js";
// import {useInventarioStore} from "../../../stores/inventarioStore.js"
// import { useLoteStore } from "../../../stores/lotesStore";
// import {useEtapaStore} from '../../../stores/etapaStore.js'
import { useUsuarioStore,useInventarioStore, useEtapaStore, useLoteStore, usePersonasStore } from "../../../stores/index.js";
import { showAlert } from '../../../modules/sweetalert.js';


// import { storeToRefs } from "pinia";
// import { useQuasar } from 'quasar'

const storeEtapa=useEtapaStore()
const storePersona = usePersonasStore()
const storeInventario= useInventarioStore()
const storeLotes=useLoteStore()
// const storeUser = useUsuarioStore();
// const $q = useQuasar();
// const hasItToken = $q.cookies.has('token')


let fullWidth = ref(false)
let nombre =ref('')
let inventario = ref()
let personas=ref()
let lotes=ref()
let estado=ref()
let activity=ref()
let rows = ref([]);

let arrayPersonas = ref([])
let arrayInventario=ref([])
let ArrayLotes=ref([])
function abrirModal() {
    fullWidth.value = true
}
let visibleColumns =ref(['state', 'nombre','inventario', 'personas', 'lotes', 'estado', 'activity', 'editar' ])

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
    name: "inventario", 
    align: "center",
    label: "inventario", 
    field: (row) => row.process[0].elements
[0],
    format: (val) => `${val.name}`,
},
{ 
    name: "personas",
    align: "center", 
    label: "personas", 
    field: "personas" 
},
{
    name: "lotes",
    align: "center",
    label: "lotes",
    field: "lotes",
},
{
    name: "estado",
    align: "center",
    label: "estado",
    field: "estado",
},
{
    name: "activity",
    align: "center",
    label: "activity",
    field: "activity",
},
  { name: "editar", align: "center", label: "editar" },
];
async function ordenarEtapas() {
    try{
        let res ={}
        res.inventario = await storeInventario.getInventario();
        res.personas = await storePersona.getPersona()
        res.lotes= await storeLotes.getLote()
        res.etapa=await storeEtapa.getEtapa()

        arrayInventario.value= res.inventario.data.inventario.map((e)=>({
            label:e.name,
            value:e._id
        }))

        arrayPersonas.value= res.personas.data.personas.map((e)=>({
            label:e.name,
            value:e._id
        }))

        ArrayLotes.value= res.lotes.data.lotes.map((e)=>({
            label:e.name,
            value:e._id
        }))

        console.log( ArrayLotes.value);
         
        if (res['etapa'].status == 200) {
            rows.value= res['etapa'].data.etapas
            console.log(rows.value);
        } else if (res['etapas'].status == 404) {
            console.log("No existen datos");

        } else {
        console.log(res.status);
    }
    }catch(error){
        console.log("Error al obtener las peticiones ", error);
    }
    
}
ordenarEtapas()

async function createEtapa() {
    console.log( inventario.value,personas.value,lotes.value, activity.value);
    await storeEtapa.addEtapa({

        
        // inventario:inventario.value,
        // personas:personas.value, 
        // lotes:lotes.value,
        // activity:activity.value,
        // estado:estado.value,
        
    name: "etapa 3",
    allotment:"64758b6f6d98981af63d71fc",
    process: [
        {
            workers: ["6475fcad3aef607c22467bfa"],
            elements: ["6477c9e859545308d31062ce"],
            state: 1,
            activity: "nuevaa2",
            stateActivity: "por 22",
        }
    ]

    })
    ordenarEtapas()
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
}</style>