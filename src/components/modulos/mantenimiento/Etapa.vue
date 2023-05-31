<template>
    <div class="justify-center items-center d-flex">
        <div class="row">
            <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
            <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
                <div class="q-ma-xs-md q-ma-lg-sm">
                    <q-table class="paddingTabla" title="Lotes" :rows="rows" :columns="columns" row-key="name">
                        <template v-slot:top="props">
                            <div class="col-5" align="left"><span style="font-size: 25px;">Etapas</span></div>
                            <div class="col-5" align="right">
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
                    <!-- <q-linear-progress dark query color="green" class="q-mt-sm" /> -->
                    <!-- <q-linear-progress dark rounded indeterminate color="black" class="q-mt-sm" /> -->
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
                                        <q-input filled v-model="name" label="Nombre"   />
                                    </div>
                                </div>
                                <div class="col-5 input">

                                    <div class="" style="width: 400px;">
                                        <q-select filled v-model="model" label="Lotes" multiple :options="options" />

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
                                            <q-select filled v-model="model" label="Personal" multiple :options="options" />
                                        </div>
                                    </div>

                                </div>


                                <div class="col-1"></div>
                                <div class="col-5 input">
                                    <div class="" style="width: 400px;">

                                        <q-select filled v-model="inventory" label="Inventario" multiple
                                            :options="options" />

                                    </div>
                                </div>

                                <div class="col-5 input">
                                    <div class="" style="width: 400px;">
                                        <q-input filled v-model="state" label="Estado"   />
                                    </div>
                                </div>

                            </div>

                        </q-card-section>
                    </q-card>
                </q-card-section>


                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
    
<script setup>
import { ref } from 'vue';
import { usePersonasStore } from '../../../stores/personasStore.js'
import { useUsuarioStore } from "../../../stores/usuarioStore";
import { storeToRefs } from "pinia";
import { useQuasar } from 'quasar'

const store = usePersonasStore()
const storeUser = useUsuarioStore();
const $q = useQuasar();
const hasItToken = $q.cookies.has('token')


let fullWidth = ref(false)
let model = ref(null)
let lotes = ref()

let options = ref(['lote1', 'lote2', 'lote3', 'lote4'])

function abrirModal() {
    console.log(lotes.value);
    console.log(options.value);
    fullWidth.value = true
}

async function ordenarPersona() {
    const res = await store.getPersona()
    if (res.status == 200) {
        let dataP = res.data.personas
        for (let index = 0; index < dataP.length; index++) {
            console.log(dataP[index]['name']);
            // const element = array[index];
            
        }
        // console.log(res.data.personas);
    } else if (res.status == 404) {
        console.log("No existen datos");
    } else {
        console.log(res.status);
    }
}
ordenarPersona()







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