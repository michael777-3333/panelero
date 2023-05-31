// FILE: main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import quasarLang from 'quasar/lang/es'
import 'quasar/src/css/flex-addon.sass';
import { createRouter, createWebHashHistory } from "vue-router";
import { Quasar, Cookies, LocalStorage, SessionStorage, Notify} from 'quasar';
import { routes } from './routes/routes.js';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/flex-addon.sass';
import 'quasar/src/css/index.sass';
import './style.css';

// icons
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import '@quasar/extras/themify/themify.css'

import App from './App.vue';

// A few examples for animations from Animate.css:
import '@quasar/extras/animate/fadeIn.css'
import '@quasar/extras/animate/fadeOut.css'
import '@quasar/extras/animate/slideInDown.css'
import '@quasar/extras/animate/slideInUp.css'
import '@quasar/extras/animate/flipInX.css'
import '@quasar/extras/animate/zoomIn.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

const pinia = createPinia();

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    Cookies,
    Notify,
    LocalStorage,
    SessionStorage
  },
  config: {
    notify: {}
  }
});

myApp.use(router);

myApp.use(pinia);

myApp.mount('#app');