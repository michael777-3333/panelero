<template>
    <div class="justify-center items-center d-flex">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
          <div class="tituloLotes text-center">
            <h1 class="tituloh1 text-h6">Lotes</h1>
          </div>
        </div>
        <div class="col-4"></div>
      </div>
      
  
  

      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <div class=" q-pa-md">
          <q-table class="paddingTabla"
            title="Lotes"
            :rows="rows"
            :columns="columns"
            row-key="name"
            >

            <template v-slot:body-cell-state="props">
              <td>
                <q-checkbox v-model="props.row.state" :true-value="1" :false-value="0" @click="editarEstado(props.row)" />
              </td>
            </template>

            <template v-slot:body-cell-editar="props">
              <td>
                <q-btn class="botonEditar" @click="usuarioEditar(props.row)" glossy label="Editar" />
              </td>     
            
            </template>
      
          </q-table>
          </div>
      </div>
      <div class="col-3"></div>
      <div class="contenedorBoton q-pa-md q-gutter-sm">
        <q-btn label="Crear usuario" style="color: #F39A31;" @click="alert = true" />
      </div>
      <q-dialog  v-model="alert">
        <q-card class="dialogLotes">
          <q-card-section>
            <div style="color:#F39A31;" class="text-h6">Alert</div>
          </q-card-section>
  
          <q-card-section class="q-pt-none">
            <q-card class="my-card d-flex" style="width: 100%">
              <q-card-section>
                <div class="row">
                  <div class="col-5">
                    <div class="buton"> <q-input v-model="name" label="nombre" /></div>
                  </div>
                  <div class="col-2"></div>
                  <div class="col-5">
                    <div class="buton"><q-input v-model="size" label="tamaño" /></div>
                  </div>
                </div>
                <div class="row d-flex q-m-sm">
                  <div class="col-5">
                    <div class="buton"><q-input v-model="owner" label="dueño" /></div>
                  </div>
                  <div class="col-2"></div>
                  <div class="col-5">
                    <div class="buton"><q-input v-model="createdAt" label="fecha" /></div>
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="center">
                <q-btn @click="createAllotment()" style="color:#F39A31 " class="q-my-md" label="Crear Usuario" />
              </q-card-actions>
            </q-card>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="OK" style="color:#F39A31 " v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
  
    </div>
    </div>
  </template>
  
  <script setup>
  
  import { ref } from 'vue';
  import { useLoteStore} from '../../../stores/lotesStore.js'
  import { useUsuarioStore } from '../../../stores/usuarioStore'; 
  import axios from 'axios';
  import {useQuasar} from 'quasar'

  async function ordenarLotes (){
    const res= await store.getLote()
    
    if (res.status<300) {
      rows.value=res.data.lote
    } else if (res.response.status==404) {
      console.log("los datos no existen");
    }

    // await Promise.all([store.getLote()]).then(response => rows.value = response[0].data.lotes);
    
  
  }
  const store = useLoteStore()
  const $q = useQuasar();
  let alert = ref(false)
  let name = ref("")
  let rows =ref([])
  let size = ref('');
  let owner = ref('')
  let createdAt = ref('')
  const storeUser = useUsuarioStore()

  store.getToken(storeUser.token)

  ordenarLotes()

  async function editarEstado(props){
    console.log(props);
    if (props.state==0) {
      await store.activarLote(props)
    }else if (props.state ==1) {
      await store.desactivarLote(props)
    }
    ordenarLotes()
    }


   async function createAllotment() {
      if (name.value =='') {
        $q.notify({
          type: 'negative',
          message: 'digite el nombre'
      })
      }else if(size.value==''){
        $q.notify({
          type: 'negative',
          message: 'digite el tamaño'
      })
      }else if(owner.value==''){
        $q.notify({
          type: 'negative',
          message: 'digite el dueño '
      })
      }else if(createdAt.value== ''){
        $q.notify({
          type: 'negative',
          message: 'digite la fecha'
      })
      }else{
      await store.addLote({name: name.value, size: size.value, owner: owner.value, createdAt: createdAt.value});
      ordenarLotes()
      console.log(rows.value);
      alert.value = false;
      $q.notify({
          type: 'positive',
          message: 'el usuario ha sido creado correctamente'
      });
      }
    }
    const columns = [
    { name: 'state', label : 'Estado' ,align:"left" },
    {
      label: 'Nombre',
      align: 'left',
      field: row => row.name, 
      format: val => `${val}`,
      sortable: true,
    },
      
    { name: 'size', align: 'left', label: 'tamaño', field: 'size' },
    { name: 'owner', align: 'left', label: 'dueño', field: 'owner' },
    { name: 'createdAt', align: 'left', label: 'fecha creacion', field: 'createdAt' },
    { name: 'editar', align: 'left', label: 'editar'},

  ]
  
  </script>
  
  <style>
  .tituloLotes {
    /* width: 10px; */
    /* height: 10px; */
    background-color: #F39A31;
    border-radius: 30px;
    /* width: 400px; */
  
  }
  
  .tituloh1 {
    font-size: 20px;
  }
  
  /* .my-card{
      background-color: #f3993181;
      border-radius: 30px;
      margin-left: 60%;
  } */
  .buton {
    /* margin-top: 5px; */
    background-color: #F8EDE2;
    border-radius: 30px;
    margin: 3px 3px;
    /* height: 40px; */
  }
  
  .dialogLotes{
    background-color: #F39A31;
    
  }

  /* .my-card-width {
    max-width: 600px;
  } */
  
  /* .contenedorBoton {
    margin-left: 44%;
  } */
  
  
  /*  */</style>