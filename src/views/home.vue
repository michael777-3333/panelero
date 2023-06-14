<template>
    <div class="q-pa-none">
        <q-layout view="hHh Lpr fFf" container style="height: 100vh" class="shadow-2">

            <v-header />

            <q-page-container>
                <q-page padding>
                    <router-view></router-view>
                </q-page>
            </q-page-container>

            <v-footer />

        </q-layout>
    </div>
</template>

<script setup>
import vFooter from '../components/Footer.vue'
import vHeader from '../components/Header.vue'
</script>
  
<style scoped>
.texto-menuList {
    /* font-family: Comic Sans MS; */
    font-size: 1.2rem;
    color: white;
}
</style>