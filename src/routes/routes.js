// import AdmCostos from '../components/modulos/costos/CostoAdmin.vue'
import Bodega from '../components/modulos/inventario/Bodega.vue'
import Body from "../components/Body.vue"
// import CostosModulos from "../components/modulos/costos/CostosModulos.vue"
import errorf from '../components/404.vue'
import Etapa from '../components/modulos/mantenimiento/Etapa.vue'
import Facturacion from '../components/modulos/facturacion/Facturacion.vue'
import Finca from '../components/modulos/mantenimiento/Finca.vue'
import Home from "../components/modulos/Home.vue"
import Inventario from '../components/modulos/inventario/Inventario.vue'
import Login from "../components/Login.vue"
import Lotes from '../components/modulos/mantenimiento/Lotes.vue'
import Marcas from '../components/modulos/mantenimiento/Marcas.vue'
import Pedidos from '../components/modulos/facturacion/Pedidos.vue'
import Personas from '../components/modulos/mantenimiento/Personas.vue'
import Usuario from '../components/modulos/mantenimiento/Usuario.vue'


export const routes = [
    { path: "/", component: Login },
    {
        path: "/body", component: Body, children: [

            { path: "home", component: Home },

            // {
                // path: "costos", children: [
                //     { path: "costosModulos", component: CostosModulos },
                //     { path: "adminCostos", component: AdmCostos },
                // ]
            // },
            
            {
                path: "mantenimiento", children: [
                    { path: "usuario", component: Usuario },
                    { path: "lote", component: Lotes },
                    { path: "persona", component: Personas },
                    { path: 'etapa', component: Etapa },
                    { path: 'marca', component: Marcas },
                    { path: 'finca', component: Finca }
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
                    {path: 'inventario', component: Inventario}
                ]
            },

            // { patch: "/qwer", component: errorf}
    // { patch: '/:catchAll(.*)',  redirect: "/body/home/",}

        ]
    },
    // { patch: '/:catchAll(.*)*', component: errorf}
    // { patch: '/:catchAll(.*)',  redirect: "/body/home/",}

]