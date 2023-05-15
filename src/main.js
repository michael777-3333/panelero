import './style.css';
import { createApp } from 'vue';
import { Quasar, Cookies, LocalStorage, SessionStorage, Notify} from 'quasar';
import { createPinia } from 'pinia';

import '@quasar/extras/material-icons/material-icons.css';

import 'quasar/src/css/index.sass';

import App from './App.vue';

import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from './routes/routes.js';

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