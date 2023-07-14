<template>
    <q-layout view="hHh lpr fFf">
        <Header />

        <q-page-container>
            <router-view />
        </q-page-container>

        <Footer />

    </q-layout>
</template>

<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
</script>
  
<style scoped></style>