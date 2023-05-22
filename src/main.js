import './style.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/flex-addon.sass';
import 'quasar/src/css/index.sass';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from "vue-router";
import { Quasar, Cookies, LocalStorage, SessionStorage, Notify} from 'quasar';
import { routes } from './routes/routes.js';
import App from './App.vue';

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