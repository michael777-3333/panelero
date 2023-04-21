<template>
    <div class="justify-center items-center d-flex">
        <h1>usuarios</h1>


        <q-card class="my-card" style="width: 30rem" >
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
            <q-card-actions>
                <q-btn @click="crearUsuario()" label="Crear Usuario" />
            </q-card-actions>
        </q-card>
    </div>
</template>

<script setup>

    import { ref } from 'vue';

    // import { useUsuarioStore } from ''

    const name = ref('');
    const email = ref('')
    const password = ref('')

    const store = useUsuarioStore()

    async function crearUsuario() {
        await store.addUsuario({name: name.value, email: email.value, password: password.value})
    }

</script>