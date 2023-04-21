<template>
    <div class="justify-center items-center d-flex">
        <h1 class="text-center text-h3">usuarios</h1>

        <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
                <q-card class="my-card d-flex" style="width: 30rem" >
                    <q-card-section>
                        <div class="row">
                            <div class="col-5">
                                <q-input v-model="name" label="nombre" />
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
            </div>
            <div class="col-4"></div>
        </div>
        <div class="row">
            <q-table
            flat bordered
            :columns="columns"
            />
            
            
        </div>

        
    </div>
</template>

<script setup>

    import { ref } from 'vue';

    import { useUsuarioStore } from '../../../stores/usuarioStore.js'
    

    const name = ref('');
    const email = ref('')
    const password = ref('')

    const columns = [{name: 'name', label: 'Nombre', align: 'left'}]

    const store = useUsuarioStore()

    

    async function crearUsuario() {
        await store.addUsuario(
            {name: name.value, email: email.value, password: password.value}
        )

        console.log(await store.getUsuario())
    }

    crearUsuario()

</script>