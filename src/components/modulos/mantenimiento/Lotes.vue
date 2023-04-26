<template>
    <div class="justify-center items-center d-flex">
      <div class="titulo">
        <h1 class="tituloh1 text-center text-h3">Lotes</h1>
      </div>
  
  
      <div class="row">
        <div class="col-3"></div>
        <!-- <div class="col-4"></div> -->
        <!-- <div class="col-4">
                  <q-card class="my-card d-flex" style="width: 200%" >
                      <q-card-section>
                          <div class="row">
                              <div class="col-5">
                                  <div class="buton"> <q-input v-model="name" label="nombre" /></div>
                              </div>
                              <div class="col-2"></div>
                              <div class="col-5">
                                  <q-input label="identificacion" />
                              </div>
                          </div>
                          <div class="row d-flex q-m-sm">
                              <div class="col-5">
                                  <q-input v-model="email" label="correo" />
                              </div>
                              <div class="col-2"></div>
                              <div class="col-5">
                                  <q-input v-model="password" label="contraseña" />
                              </div>
                          </div>
                          <div class="row d-flex justify-center q-m-sm">
                              <div class="col-6">
                                  <q-input label="rol" />
                              </div>
                          </div>
                      </q-card-section>
                      <q-separator />
                      <q-card-actions align="center">
                          <q-btn @click="crearUsuario()" class="q-my-md" label="Crear Usuario" />
                      </q-card-actions>
                  </q-card>        
              </div> -->
  
        <div class="q-pa-md">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">Tipo de caña</th>
                <th class="text-right">Fecha de corte</th>
                <th class="text-right">Cantidad de agua</th>
                <th class="text-right">Numero de trabajadores </th>
                <th class="text-right">Encargado del lote</th>
                <th class="text-right">Fecha de siembra</th>
                <th class="text-right">cantidad de caña cosechada</th>
                <th class="text-right">Tipo de fertilizante</th>
                <th class="text-right">Tipo de suelo</th>
                <th class="text-right">Hectareas de lote</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in users" :key="i">
                <td class="text-left">{{ p.name }}</td>
  
                <td class="text-right">{{ p.identificacion }}</td>
                <td class="text-right">{{ p.email }}</td>
                <td class="text-right">{{ p.password }}</td>
                <td class="text-right">{{ p.model }}</td>
                <td class="text-right">{{ p.eps }}</td>
                <td class="text-right">{{ p.eps }}</td>
                <td class="text-right">{{ p.eps }}</td>
                <td class="text-right">{{ p.eps }}</td>
                <td class="text-right">{{ p.eps }}</td>
              </tr>
              <tr>
                <!-- <td class="text-left">Ice cream sandwich</td> -->
                <!-- <td class="text-right">237</td>
            <td class="text-right">9</td>
            <td class="text-right">37</td>
            <td class="text-right">4.3</td>
            <td class="text-right">129</td> -->
              </tr>
              <tr>
                <!-- <td class="text-left">Eclair</td> -->
                <!-- <td class="text-right">262</td>
            <td class="text-right">16</td>
            <td class="text-right">23</td>
            <td class="text-right">6</td>
            <td class="text-right">337</td> -->
              </tr>
              <tr>
                <!-- <td class="text-left">Cupcake</td> -->
                <!-- <td class="text-right">305</td>
            <td class="text-right">3.7</td>
            <td class="text-right">67</td>
            <td class="text-right">4.3</td>
            <td class="text-right">413</td> -->
              </tr>
              <tr>
                <!-- <td class="text-left">Gingerbread</td> -->
                <!-- <td class="text-right">356</td>
            <td class="text-right">16</td>
            <td class="text-right">49</td>
            <td class="text-right">3.9</td>
            <td class="text-right">327</td> -->
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <div class="col-4"></div>
      </div>
      <div class="contenedorBoton q-pa-md q-gutter-sm">
        <q-btn label="Crear usuario" style="color: #F39A31;" @click="alert = true" />
      </div>
      <q-dialog class="dialog" v-model="alert">
        <q-card>
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
                    <div class="buton"><q-input v-model="identificacion" label="identificacion" /></div>
                  </div>
                </div>
                <div class="row d-flex q-m-sm">
                  <div class="col-5">
                    <div class="buton"><q-input v-model="email" label="correo" /></div>
                  </div>
                  <div class="col-2"></div>
                  <div class="col-5">
                    <div class="buton"><q-input v-model="password" label="contraseña" /></div>
                  </div>
                </div>
                <div class="row d-flex q-m-sm">
  
                  <div class="col-5">
                    <div class="buton"><q-select outlined v-model="model" :options="tipoUsuario" label="Tipo de usuario" />
                    </div>
                  </div>
                  <div class="col-2"></div>
                  <div class="col-5">
                    <div class="buton"><q-input v-model="eps" label="EPS" /></div>
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="center">
                <q-btn @click="createUser()" style="color:#F39A31 " class="q-my-md" label="Crear Usuario" />
              </q-card-actions>
            </q-card>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="OK" style="color:#F39A31 " v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
  
    </div>
  </template>
  
  <script setup>
  
  import { ref } from 'vue';
  
  // import { useUsuarioStore } from '../../../stores/usuarioStore.js'
  // export default {
    // setup() {
      let name = ref('');
      let email = ref('')
      let password = ref('')
      let eps = ref('')
      let model = ref('')
      let identificacion = ref('')
      let users = ref([
        {
          name: "Juan",
          email: 'estivem03@gmail.com',
          password: '383u3n73',
          eps: 'Sanitas',
          identificacion: "110202022",
          model: 'google',
  
        },
      ])
  
      function createUser() {
        users.value.push({
          name: name.value,
          email: email.value,
          password: password.value,
          eps: eps.value,
          identificacion: identificacion.value,
          model: model.value// tipoUsuario:tipoUsuario.value
  
        })
        console.log(users.value);
      }
  
      // const columns = [{name: 'name', label: 'Nombre', align: 'left'}]
  
      // const store = useUsuarioStore()
  
  
  
      // async function crearUsuario() {
      //   await store.addUsuario(
      //     { name: name.value, email: email.value, password: password.value }
      //   )
  
      //   console.log(await store.getUsuario())
      // }
  
  
  
  
  
      // crearUsuario()
  
  
      // return {
      //   eps, model, password, email, identificacion, name, users, createUser,
  
        let alert = ref(false)
        let confirm = ref(false)
        let prompt = ref(false)
  
        let address = ref('')
        // let model = ref()
        let tipoUsuario = [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ]
      // }
    // }
  // }
  
  
  
  
  </script>
  
  <style>
  .titulo {
    /* width: 10px; */
    /* height: 10px; */
    background-color: #F39A31;
    border-radius: 30px;
    width: 400px;
    margin-left: 37%;
  
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
  
  .my-card-width {
    max-width: 600px;
  }
  
  .contenedorBoton {
    margin-left: 44%;
  }
  
  
  /*  */</style>