import Login from "../components/Login.vue"
import Body from "../components/Body.vue"
import Home from "../components/modulos/Home.vue"
import CostosModulos from "../components/modulos/costos/CostosModulos.vue"
import Usuario from '../components/modulos/mantenimiento/Usuario.vue'
import HomeMantenimiento from '../components/modulos/mantenimiento/HomeMantenimiento.vue'
import Lotes from '../components/modulos/mantenimiento/Lotes.vue'
import HomeCostos from '../components/modulos/costos/HomeCostos.vue'
import AdmCostos from '../components/modulos/costos/CostoAdmin.vue'
import Personas from '../components/modulos/mantenimiento/Personas.vue' 
import Facturacion from '../components/modulos/facturacion/Facturacion.vue'
import Pedidos from '../components/modulos/facturacion/Pedidos.vue'

import Etapa from '../components/modulos/mantenimiento/Etapa.vue'

export const routes = [
    { path:"/", component: Login },
    { path:"/body", component: Body, children: [
            { path:"home", component: Home},

            {
                path:"costos", children: [
                    { path:"homeCostos", component: HomeCostos},
                    { path:"costosModulos" , component: CostosModulos},
                    { path:"adminCostos" , component: AdmCostos},
                ]
            },
            {
                path:"mantenimiento", children: [
                    { path:"homeMantenimiento", component: HomeMantenimiento},
                    { path:"usuario", component: Usuario },
                    { path:"lotes", component: Lotes},
                    { path:"personas", component: Personas},
                    { path: 'etapa', component: Etapa },
                ]
            },
            
            {
                path:"facturacion", children: [
                    { path:"facturacionModulos", component: Facturacion},
                    { path:"pedidosModulos", component: Pedidos},
                ]
            }
        ]
    }
]