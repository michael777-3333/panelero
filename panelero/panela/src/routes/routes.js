import Login from "../components/Login.vue"
import Body from "../components/Body.vue"
import Home from "../components/modulos/Home.vue"
import Mantenimiento from "../components/modulos/Mantenimiento.vue"

export const routes=[
    { path:"/", component: Login },
    { path:"/body", component: Body, children: [
        { path:"home", component: Home},
        { path:"mantenimiento", component: Mantenimiento}
        // path:"/home",component:Home,
        // path:"/home",component:Home,
        // path:"/home",component:Home,
    ]
}
]