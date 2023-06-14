import { request, getToken, url } from '../utils/'

const getInventory = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.inventario,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addInventory = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.inventario,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editInventory = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.inventario}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledInventory = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.inventario}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledInventory = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.inventario}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getInventory,
    addInventory,
    editInventory,
    enabledInventory,
    disabledInventory
}