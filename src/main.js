import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { Quasar, Loading, Cookies, LocalStorage, SessionStorage, Notify} from 'quasar';
import { router } from './routes/';

import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/themify/themify.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

import 'quasar/src/css/flex-addon.sass';
import 'quasar/src/css/index.sass';

import './style.css';

import App from './App.vue';

import '@quasar/extras/animate/bounceIn.css'
import '@quasar/extras/animate/bounceOut.css'
import '@quasar/extras/animate/fadeIn.css'
import '@quasar/extras/animate/fadeOut.css'
import '@quasar/extras/animate/flipInX.css'
import '@quasar/extras/animate/slideInDown.css'
import '@quasar/extras/animate/slideInUp.css'
import '@quasar/extras/animate/zoomIn.css'

const pinia = createPinia();

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    Cookies,
    Loading,
    // LocalStorage,
    Notify,
    // SessionStorage
  },
  config: {
    notify: {},
    loading: {}
  }
});

myApp.use(router);

myApp.use(pinia);

myApp.mount('#app');