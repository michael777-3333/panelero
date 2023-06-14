import { request, getToken, url } from '../utils/'

const getStore = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.bodega,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addStore = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.bodega,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editStore = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.bodega}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledStore = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.bodega}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledStore = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.bodega}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getStore,
    addStore,
    editStore,
    enabledStore,
    disabledStore
}