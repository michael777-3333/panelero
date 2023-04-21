import Login from "../components/Login.vue"
import Body from "../components/Body.vue"
import Home from "../components/modulos/Home.vue"
import CostosModulos from "../components/modulos/costos/CostosModulos.vue"
import Usuario from '../components/modulos/mantenimiento/Usuario.vue'

export const routes = [
    { path:"/", component: Login },
    { path:"/body", component: Body, children: [
            { path:"home", component: Home},
            { path:"mantenimiento", children: [
                    { path:"usuario", component: Usuario }
                ]
            },
            { path:"costos", children: [
                { path:"costoModulos", component:CostosModulos}
            ]
            }
        ]
    }
]