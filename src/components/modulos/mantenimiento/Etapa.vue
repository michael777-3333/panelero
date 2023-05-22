<!-- edit! -->
<template>
    <!-- <div v-show="hasEtapa == false">
        <q-form class="full-width">
            <h1 class="full-width text-center text-h5">crear etapa</h1>
            
            <q-input class="q-ml-md" style="width: 18rem" label="Nombre" />

        </q-form>
    </div> -->
    <div> 
        <!-- class="full-width" -->
        <q-table
            grid
            title="Etapas"
            :columns="columns"
            :rows="data"
        >
            <template v-slot:top="props">
                <div class="col-2 q-table__title">Etapas</div>

                <q-space />
                
                <q-btn class="q" label="+" @click="hasEtapa = !hasEtapa" />
            </template>
        </q-table>
    </div>

    <q-dialog v-model="hasEtapa">
        <q-card>
            <q-card-section>
                <h1 class="text-center text-h6">crear etapa</h1>
            </q-card-section>
            <q-card-section style="max-height: 50vh">
                <q-input v-model="name" class="q-ml-md" label="Nombre" />

                <div class="row justify-between">                    
                    <div class="col-5">
                        <q-input v-model="activity" class="q-ml-md" label="Actividad" />
                    </div>
                    <div class="col-5">
                        <q-input v-model="state" class="q-ml-md" label="Estado" />
                    </div>
                </div>

            </q-card-section>
            <q-separator />
            <q-card-actions align="center">
                <q-btn label="guardar" @click="createEtapa()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { ref } from 'vue';
    import { useQuasar } from 'quasar';
    import axios from 'axios';

    export default{
        setup(){
            const $q = useQuasar();
            const token = $q.cookies.get('token');
            console.log(token);

            const columns = [
                {name: 'name', label: 'Nombre', field: 'name'},
                {name: 'process', label: 'Labores', field: 'process[0].activity'},
                {name: 'state', label: 'Estado', field: 'state'},
            ]

            const hasEtapa = ref(false)

            // input dialog
            const name = ref('');
            const activity = ref('');
            const state = ref('');

            const data = [{name: 'prueba', process: [{activity: 'nueva activity'}], state: 0}]
            
            document.addEventListener('DOMContentLoaded', () => { getEtapa() })

            async function getEtapa() {
                await axios({
                    method: 'get',
                    url: 'http://10.202.80.188:3000/etapa',
                    headers: {
                        'token': token,
                    }
                }).then(res => console.log(res))
            }

            async function createEtapa() {
                await axios({
                    method: 'post',
                    url: 'http://10.202.80.188:3000/etapa',
                    headers: {
                        'token': token,
                    },
                    data: {
                        name: name.value,
                        process: [
                            {
                                activity: activity.value,
                                stateActivity: state.value
                            }
                        ]
                    }
                })
                .then(res => console.log(res))
                .catch(error => console.log(error))

                await getEtapa()
            }

            return{
                hasEtapa,
                
                createEtapa,

                columns,
                data,

                name,
                activity,
                state,
            }
        }
    }
</script>

<style lang="sass">

</style>