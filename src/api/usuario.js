import { request, getToken, setToken, removeToken, url } from '../utils/';
import { router, redirect } from '../routes/';

let token = getToken();

const getUser = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.usuario,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get user');
    }
}

const addUser = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: `${url.autenticacion}singup`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editUser = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.usuario}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledUser = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.usuario}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledUser = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.usuario}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const loginUser = async (reqData) => {
    const { data } = await request(
        {
            method: 'post',
            url: `${url.autenticacion}singin`,
            data: reqData,
        }
    )

    if (data.token) {
        setToken(data.token);
        redirect();
    }
    return data;
}

const logoutUser = async () => {
    removeToken();
    router.push('/login');
    // redirect()
}

export default {
    addUser,
    disabledUser,
    editUser,
    enabledUser,
    getUser,
    loginUser,
    logoutUser,
}