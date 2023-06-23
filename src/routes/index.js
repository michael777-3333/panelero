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
import Lotes from '../views/modulos/mantenimiento/Lotes.vue';
import Marcas from '../views/modulos/mantenimiento/Marcas.vue';
import Pedidos from '../views/modulos/facturacion/Pedidos.vue';
import Personas from '../views/modulos/mantenimiento/Personas.vue';
import Usuario from '../views/modulos/mantenimiento/Usuario.vue';
import Labores from '../views/modulos/mantenimiento/Labores.vue';
import Reportes from '../views/modulos/reportes/Reportes.vue';
import Homee from "../views/home.vue";
import { getToken } from '../utils/';

let urlSaved = null;
// var urlLoader = null;

const routes = [
    { path: '/', redirect: '/home' },
    { path: "/error", component: errorFound },
    { path: "/login", name: 'login', component: Login },
    {
        path: "/",
        name: 'Home',
        component: Homee,
        children: [
            { path: "home", component: Home },
            { path: "costos", component: Costo },
            {
                path: "mantenimiento",
                children: [
                    { path: "usuario", component: Usuario },
                    { path: "lote", component: Lotes },
                    { path: "persona", component: Personas },
                    { path: 'etapa', component: Etapa },
                    { path: 'marca', component: Marcas },
                    { path: 'finca', component: Finca },
                    { path: 'labores', component: Labores }
                ]
            },
            {
                path: "facturacion",
                children: [
                    { path: "facturacion", component: Facturacion },
                    { path: "pedido", component: Pedidos },
                ]
            },
            {
                path: "inventario",
                children: [
                    { path: "bodega", component: Bodega },
                    { path: 'inventario', component: Inventario }
                ]
            },
            { path: "reporte", component: Reportes },
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
