// FILE: main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import quasarLang from 'quasar/lang/es'
import 'quasar/src/css/flex-addon.sass';
import { createRouter, createWebHashHistory } from "vue-router";
import { Quasar, Loading, Cookies, LocalStorage, SessionStorage, Notify} from 'quasar';
import { routes } from './routes/routes.js';
// import Swal from 'sweetalert2';
// const Swal = require('sweetalert2')
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/themify/themify.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

// Import Quasar css
import 'quasar/src/css/flex-addon.sass';
import 'quasar/src/css/index.sass';
import './style.css';

import App from './App.vue';

// A few examples for animations from Animate.css:
import '@quasar/extras/animate/bounceIn.css'
import '@quasar/extras/animate/bounceOut.css'
import '@quasar/extras/animate/fadeIn.css'
import '@quasar/extras/animate/fadeOut.css'
import '@quasar/extras/animate/flipInX.css'
import '@quasar/extras/animate/slideInDown.css'
import '@quasar/extras/animate/slideInUp.css'
import '@quasar/extras/animate/zoomIn.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

const pinia = createPinia();

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    Loading,
    Cookies,
    Notify,
    LocalStorage,
    SessionStorage
  },
  lang: quasarLang,
  config: {
    notify: {},
    loading: { /* look at QuasarConfOptions from the API card */ }
  }
});

myApp.use(router);

myApp.use(pinia);

myApp.mount('#app');