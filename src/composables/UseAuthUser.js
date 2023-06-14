import { ref } from 'vue';
// import { Cookies } from 'quasar';
import { useQuasar } from 'quasar';

// outside of a Vue file
// const cookies = Cookies.getAll()
// console.log({cookies});
// export const token = cookies.token

const user = ref(null)
const token = ref(null)
// cookies = ref(null)

export default function useAuthUser() {
    
    const $q = useQuasar()
    // const value = $q.cookies.get('cookie_name')
    // const login = async ({})
    // const token = 
    const getToken = () => {
        // token.value = cookies.token
        token.value = $q.cookies.get('token')
        console.log(2,token.value);
        return token.value
    }
    return {
        getToken
    }
}