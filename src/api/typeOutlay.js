import { request, getToken, url } from '../utils/'

const getOutlay = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.tipogasto,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addOutlay = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.tipogasto,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editOutlay = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.tipogasto}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const activateOutlay = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.tipogasto}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const desactivateOutlay = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.tipogasto}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getOutlay,
    addOutlay,
    editOutlay,
    activateOutlay,
    desactivateOutlay
}