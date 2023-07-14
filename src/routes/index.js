import { createRouter, createWebHashHistory } from 'vue-router';

import Bodega from '../views/modulos/inventario/Bodega.vue';
import Costo from '../views/modulos/costo/Costo.vue';
import errorFound from '../views/404.vue';
import Etapa from '../views/modulos/mantenimiento/Etapa.vue';
import Facturacion from '../views/modulos/facturacion/Facturacion.vue';
import Finca from '../views/modulos/mantenimiento/Finca.vue';
import Home from "../views/modulos/Home.vue";
import Inventario from '../views/modulos/inventario/Inventario.vue';
import Login from "../views/Login.vue";
import Lote from '../views/modulos/mantenimiento/Lote.vue';
import Marca from '../views/modulos/mantenimiento/Marca.vue';
import Pedido from '../views/modulos/facturacion/Pedido.vue';
import Persona from '../views/modulos/mantenimiento/Persona.vue';
import Usuario from '../views/modulos/mantenimiento/Usuario.vue';
import Labor from '../views/modulos/mantenimiento/Labor.vue';
import Reporte from '../views/modulos/reportes/Reporte.vue';
import Layout from "../views/Layout.vue";
import { getToken } from '../utils/';

let urlSaved = null;
// var urlLoader = null;

const routes = [
    { path: "/error", component: errorFound },
    { path: "/login", name: 'login', component: Login },
    {
        path: "/",
        redirect: '/home',
        name: 'layout',
        component: Layout,
        children: [
            { path: "home", component: Home },
            { path: "costo", component: Costo },
            {
                path: "mantenimiento",
                children: [
                    { path: "usuario", component: Usuario },
                    { path: "lote", component: Lote },
                    { path: "persona", component: Persona },
                    { path: 'etapa', component: Etapa },
                    { path: 'marca', component: Marca },
                    { path: 'finca', component: Finca },
                    { path: 'labor', component: Labor }
                ]
            },
            {
                path: "facturacion",
                component: Facturacion,
                children: [
                    { path: "pedido", component: Pedido },
                ]
            },
            {
                path: "inventario",
                component: Inventario,
                children: [
                    { path: "bodega", component: Bodega },
                ]
            },
            { path: "reporte", component: Reporte },
        ]
    },
    { path: "/:catchAll(.*)", redirect: "/error" },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});


function saveRedirect(path) {
    urlSaved = path;
}

function redirect() {
    router.push(urlSaved || '/');
}

// function saveUrl(path) {
//     urlLoader = path;
// }

// function getUrl() {
//     return urlLoader;
// }

router.beforeEach(async (to) => {
    // Redirigir a la página de inicio de sesión si el usuario no ha iniciado sesión e intenta acceder a una página restringida.
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = getToken();
    // saveUrl(to.fullPath);
    // urlLoader = to.fullPath
    // console.log(to.fullPath);

    if (authRequired && !auth) {
        saveRedirect(to.fullPath); // Es la ruta completa a la que se estaba intentando acceder.
        return '/login';
    }
});

export {
    router,
    redirect,
    // saveRedirect,
    // saveUrl,
    // getUrl
};
