import { createRouter, createWebHashHistory } from 'vue-router';

// import Body from "../views/Body.vue"
import Bodega from '../views/modulos/inventario/Bodega.vue'
import Costo from '../views/modulos/costo/Costo.vue'
import errorFound from '../views/404.vue'
import Etapa from '../views/modulos/mantenimiento/Etapa.vue'
import Facturacion from '../views/modulos/facturacion/Facturacion.vue'
import Finca from '../views/modulos/mantenimiento/Finca.vue'
import Home from "../views/modulos/Home.vue"
import Inventario from '../views/modulos/inventario/Inventario.vue'
import Login from "../views/Login.vue"
import Lotes from '../views/modulos/mantenimiento/Lotes.vue'
import Marcas from '../views/modulos/mantenimiento/Marcas.vue'
import Pedidos from '../views/modulos/facturacion/Pedidos.vue'
import Personas from '../views/modulos/mantenimiento/Personas.vue'
import Usuario from '../views/modulos/mantenimiento/Usuario.vue'
import Labores from '../views/modulos/mantenimiento/Labores.vue'
import Reportes from '../views/modulos/reportes/Reportes.vue'

import Homee from "../views/home.vue";

const routes = [
    { path: '/', redirect: '/home' },
    { path: "/error", component: errorFound, },
    { path: "/login", name: 'login', component: Login, },
    {
        path: "/", name: 'Home', component: Homee, children: [

            { path: "home", component: Home },

            { path: "costos", component: Costo },

            {
                path: "mantenimiento", children: [
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
                path: "facturacion", children: [
                    { path: "facturacion", component: Facturacion },
                    { path: "pedido", component: Pedidos },
                ]
            },

            {
                path: "inventario", children: [
                    { path: "bodega", component: Bodega },
                    { path: 'inventario', component: Inventario }
                ]
            },

            { path: "reporte", component: Reportes },

        ]
    },

    { path: "/:catchAll(.*)", redirect: "/error", },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});