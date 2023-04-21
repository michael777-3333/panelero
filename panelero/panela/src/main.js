// FILE: main.js

import { createApp } from 'vue'
import { Quasar } from 'quasar'

import { createPinia } from 'pinia'


// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router" 
import { routes } from './routes/routes.js'

const router = createRouter({
    history:createWebHashHistory(),
    routes: routes
});


const pinia = createPinia()

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {}, 
});

myApp.use(router);

myApp.use(pinia);

myApp.mount('#app');