import { request, getToken, savedToken, url } from '../utils/'
import { deleteToken } from '../utils/cookies'

const getUser = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.usuario,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addUser = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: `${url.autenticacion}singup`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editUser = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.usuario}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledUser = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.usuario}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledUser = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.usuario}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const loginUser = async (reqData) => {
    const { data } = await request(
        {
            method: 'post',
            url: `${url.autenticacion}singin`,
            data: reqData,
        }
    )
    
    savedToken(data.token)
    return data
}

const logoutUser = async () => {
    deleteToken()
}

export default {
    getUser,
    addUser,
    editUser,
    enabledUser,
    disabledUser,
    loginUser
}