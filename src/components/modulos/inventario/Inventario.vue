<template>
    <div class="justify-center items-center d-flex">
  
      <div class="row">
          <div class="col-xs-auto col-sm-1 col-md-2 col-lg-1"></div>
          <div class="col-xs-12 col-sm-10 col-md-8 col-lg-10 text-center">
          <div v-if="rows.length > 0" class="q-ma-xs-md q-ma-lg-sm">
            <q-table class="paddingTabla" title="Lotes" :rows="rows" :columns="columns" row-key="name">
  
  
              <template v-slot:top="props">
  
                <div class="col-6" align="left"><span style="font-size: 25px;">Inventario</span></div>
                <div class="col-6" align="right">
                  <q-btn class="botonCrear" style="font-size: 14px; background: #ffffff6b; color: white;" @click="abrirModal()"
                    glossy label="anadir inventario" />
                </div>
  
              </template>
  
  
              <template v-slot:body-cell-state="props">
                <td>
                  <q-checkbox v-model="props.row.state" color="green" :true-value="1" :false-value="0" @click="editarEstado(props.row)" />
                </td>
              </template>
  
              <template v-slot:body-cell-editar="props">
                <td>
                  <q-btn class="botonEditar" style="background-color:#029127 ;" @click="inventarioEditar(props.row)" glossy  >
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
  
  
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">
            <q-dialog v-model="alert" persistent>
          <!-- <div class="row">
          </div> -->
          <q-card class="dialogInventario" >
            <q-card-section class="cardInventario">
              <div style="color: white" class="text-h6">Inventario</div>
            </q-card-section>
  
            <q-card-section class="q-pt-none">
              <q-card class="inventarioCard d-flex" >
                <q-card-section>
                  <div class="row">
                    <div class="col-1"></div>
                    <div class="col-5">
                      <div class="buton">
                        <q-input filled v-model="name" class="input"  label="Nombre" :dense="dense" />
  
                        <!-- <q-input v-model="name" label="nombre" /> -->
                      </div>
                    </div>
                    <!-- <div class="col-"></div> -->
                    <div class="col-5">
                      <div class="buton">
                        <q-input filled v-model="quantity" class="input"  label="Cantidad" :dense="dense" />
                      </div>
                    </div>
                    <div class="col-1"></div>
  
                    <div class="col-1"></div>
                    <div class="col-5">
                      <div class="buton">
                        <q-select filled v-model="bodegas" label="Bodega" multiple :options="arrayBodegas" />
           
                      </div>
                    </div>
                    
                    <div class="col-5">
                      <div class="buton">
                        <q-select filled v-model="mark" label="Bodega" multiple :options="arrayMarcas" />
  
                      </div>
                    </div>
                    <div class="col-1"></div>
                  </div>
                  
                  
                 
                </q-card-section>
                <q-separator />
                <q-card-actions align="center">
                  <q-btn @click="createInventory()" style="bottom: green; color: white;" class="q-my-md bg-green" label="Crear Lote" />
                  <q-btn class="bg-red text-white float-right" @click="cerrarModal()" label="Cerrar" />
                </q-card-actions>
              </q-card>
            </q-card-section>
  
          </q-card>
        </q-dialog>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useInventarioStore } from "../../../stores/inventarioStore.js";
  import { useUsuarioStore } from "../../../stores/usuarioStore";

  import { storeToRefs } from "pinia";
  
  import { useQuasar } from "quasar";
  
  const store = useInventarioStore();
  const storeUser = useUsuarioStore();

  // const stateUser = storeToRefs(storeUser);
  const $q = useQuasar();
  const hasItToken = $q.cookies.has('token')
  
  let alert = ref(false);
  let name = ref("");
  let rows = ref([]);
  let quantity = ref("");
  let bodegas = ref("");
  let validarEditar = ref(true)
  let mark = ref("");
  let data = ref(null)
  let id = ref(null)
  
  function vaciarModal() {
     quantity.value=''
      bodegas.value='' 
      name.value=''
  }
  
  async function ordenarInventario() {
    const res = await store.getInventario();
    if (res.status == 200) {
      rows.value = res.data.inventario;
      console.log(rows.value);
      console.log('ll');
    } else if (res.status == 404) {
      console.log("No existen datos");
    } else {
      console.log(res.status);
    }
  }
  ordenarInventario();
  
  async function editarEstado(props) {
    console.log("hola");
    console.log(props);
    if (props.state == 1) {
      await store.activarBodega(props);
    } else if (props.state == 0) {
      await store.desactivarBodega(props);
    }
    ordenarInventario();
  }
  
  async function createInventory() {
    if (quantity.value == "") {
      $q.notify({
        type: "negative",
        message: "digite el tamaño",
      });
    } else if (bodegas.value == "") {
      $q.notify({
        type: "negative",
        message: "digite el dueño ",
      });
    }
    else if (validarEditar.value == true) {
      await store.addLote({
        quantity: quantity.value, bodegas: bodegas.value, name: name.value, mark:mark.value
      });
      ordenarInventario();
      console.log(rows.value);
      alert.value = false;
      $q.notify({
        type: "positive",
        message: "el lote ha sido creado correctamente",
      });
    }
    else if (validarEditar.value == false) {
      console.log(data.value);
      await store.editLote({
        id: data.value._id, name: name.value, quantity: quantity.value, bodegas: bodegas.value,mark:mark.value
      });
      ordenarInventario();
      $q.notify({
        type: "positive",
        message: "el lote ha sido actualizado correctamente",
      });
      alert.value = false
      validarEditar.value = true;
    }
  }
  function inventarioEditar(info) {
    validarEditar.value = false
    alert.value = true;
    data.value = info
    console.log("e", data.value);
    quantity.value = data.value.quantity
    bodegas.value = data.value.bodegas
    name.value = data.value.name
    mark.value= data.value.mark
  }
  const columns = [
    { name: "state", label: "Estado", align: "center" },
    {
      label: "Nombre",
      align: "center",
      field: (row) => row.name,
      format: (val) => `${val}`,
      sortable: true,
    },
  
    { name: "quantity", align: "center", label: "cantidad", field: "quantity" },
    { name: "store", align: "center", label: "bodegas", field: "store" },
    {
      name: "mark",
      align: "center",
      label: "marca",
      field: "mark",
    },
    { name: "editar", align: "center", label: "editar" },
  ];
  
  function abrirModal() {
    alert.value=true
  }
  function cerrarModal() {
    alert.value=false
    vaciarModal()
    validarEditar.value=true
  }
  </script>
  
  
  <style>
  .cardInventario{
    background-color: green ;
  }
  .input{
    border-radius: 50px;
  }
  .buton{
    border-radius: 50px;
    margin: 3px 3px;
  }
  .inventarioCard{
    margin-top: 30px;
  }
  
  /* .tituloLotes {
    background-color: #f39a31;
    border-radius: 30px;
  
  }
  
  .tituloh1 {
    font-sise: 20px;
  }
  
  .buton {
  
    background-color: #f8ede2;
    border-radius: 30px;
    margin: 3px 3px;
  
  }
  
  .dialogInventario {
    background-color: #f39a31;
  } */
  </style>