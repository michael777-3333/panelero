<template>
    <div class="row justify-center">
        <div class="col-10">
            <q-select
                :options="options"
                label="Finca"
                v-model= "select"
            >
            </q-select>
        </div>
    </div>

    <div class="content" v-if="select !== null" style="width: 500px">
        <h2 v-text="select.label"></h2>

    </div>

    <!-- <q-dialog v-model="showFarm">
            <div v-for="element in options">
                <q-checkbox class="q-ma-md"
                 :name="element.name"
                 :true-value="element._id"
                 :label="element.name"
                >
                </q-checkbox>
            </div>
    </q-dialog> -->
</template>

<script setup>
    import { ref } from 'vue';
    
    // axios request
    import Finca from '../../../api/granja.js'

    const options = ref([])

    let select = ref(null)

    getFarm()

    // let showFarm = ref(true);

    async function getFarm() {
        const data = await Finca.getFarm();
        
        console.log(data , ' d')

        

        if(data.length == 0) {

        } else {
            for (let position = 0; position < data.length; position++) {
                options.value.push({label: data[position].name, value: data[position]._id, owner: data[position].ownerFarm.name})
            }
            console.log(options.value)

        }
    }

</script>

<style scope>
    .content {
        font-size: 60px;
    }
</style>