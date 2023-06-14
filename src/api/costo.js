import { request, getToken, url } from '../utils/'

const getCost = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.costo,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addCost = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.costo,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editCost = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.costo}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledCost = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.costo}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledCost = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.costo}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getCost,
    addCost,
    editCost,
    enabledCost,
    disabledCost
}