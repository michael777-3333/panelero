// FILE: main.js

import { createApp } from 'vue'
import { Quasar } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'


// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router" 
import { routes } from './routes/routes.js'

const router = createRouter({
    history:createWebHashHistory(),
    routes: routes
});


const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {}, 
});

myApp.use(router);
myApp.mount('#app');