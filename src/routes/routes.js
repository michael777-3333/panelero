import Login from "../components/Login.vue"
import Body from "../components/Body.vue"
import Home from "../components/modulos/Home.vue"
import CostosModulos from "../components/modulos/costos/CostosModulos.vue"
import Usuario from '../components/modulos/mantenimiento/Usuario.vue'
// import HomeMantenimiento from '../components/modulos/mantenimiento/HomeMantenimiento.vue'
import Lotes from '../components/modulos/mantenimiento/Lotes.vue'
// import HomeCostos from '../components/modulos/costos/HomeCostos.vue'
import AdmCostos from '../components/modulos/costos/CostoAdmin.vue'
import Personas from '../components/modulos/mantenimiento/Personas.vue'
import Facturacion from '../components/modulos/facturacion/Facturacion.vue'
import Pedidos from '../components/modulos/facturacion/Pedidos.vue'
import Marcas from '../components/modulos/mantenimiento/Marcas.vue'
import Etapa from '../components/modulos/mantenimiento/Etapa.vue'
import Bodega from '../components/modulos/inventario/Bodega.vue'
// import HomeInventario from '../components/modulos/inventario/HomeInventario.vue'
import Finca from '../components/modulos/mantenimiento/Finca.vue'
import Inventario from '../components/modulos/inventario/Inventario.vue'
import errorf from '../components/404.vue'


export const routes = [
    // TODO: Hacer que el login este en una ruta /login
    { path: "/", component: Login },
    {
        path: "/body", component: Body, children: [
            { path: "home", component: Home },

            {
                path: "costos", children: [
                    // { path:"homeCostos", component: HomeCostos},
                    { path: "costosModulos", component: CostosModulos },
                    { path: "adminCostos", component: AdmCostos },
                ]
            },
            
            {
                path: "mantenimiento", children: [
                    // { path:"homeMantenimiento", component: HomeMantenimiento},
                    { path: "usuario", component: Usuario },
                    { path: "lotes", component: Lotes },
                    { path: "personas", component: Personas },
                    { path: 'etapa', component: Etapa },
                    { path: 'marcas', component: Marcas },
                    { path: 'finca', component: Finca }
                ]
            },

            {
                path: "facturacion", children: [
                    { path: "facturacion", component: Facturacion },
                    { path: "pedidos", component: Pedidos },
                ]
            },

            {
                path: "inventario", children: [
                    // { path: "homeInventario", component: HomeInventario },
                    { path: "bodega", component: Bodega },
                    {path: 'inventario', component: Inventario}
                ]
            }

        ]
    },
    // { patch: '/:catchAll(.*)*', component: errorf}
    // { patch: '/:catchAll(.*)',  redirect: "/body",}

]