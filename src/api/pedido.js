import { request, getToken, url } from '../utils/'

const getOrder = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.pedido,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addOrder = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.pedido,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editOrder = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.pedido}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledOrder = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.pedido}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledOrder = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.pedido}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getOrder,
    addOrder,
    editOrder,
    enabledOrder,
    disabledOrder
}