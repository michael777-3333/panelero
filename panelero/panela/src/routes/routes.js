import Login from "../components/Login.vue"
import Body from "../components/Body.vue"
import Home from "../components/modulos/Home.vue"
// delete component mantenimiento
// import Mantenimiento from "../components/modulos/Mantenimiento.vue"

import Usuario from '../components/modulos/mantenimiento/Usuario.vue'

export const routes = [
    { path:"/", component: Login },
    { path:"/body", component: Body, children: [
            { path:"home", component: Home},
            { path:"mantenimiento", children: [
                    {path:"usuario", component: Usuario }
                ]
            }
        ]
    }
]