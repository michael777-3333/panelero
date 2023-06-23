// FILE: main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import quasarLang from 'quasar/lang/es'
import 'quasar/src/css/flex-addon.sass';
import { Quasar, Loading, Cookies, LocalStorage, SessionStorage, Notify} from 'quasar';
import { router } from './routes/';

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
  lang: quasarLang,
  config: {
    notify: {},
    loading: { /* look at QuasarConfOptions from the API card */ }
  }
});

myApp.use(router);
myApp.use(pinia);
myApp.mount('#app');