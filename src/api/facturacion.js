import { request, getToken, url } from '../utils/'

const getBilling = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.facturacion,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addBilling = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.facturacion,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editBilling = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.facturacion}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledBilling = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.facturacion}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledBilling = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.facturacion}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getBilling,
    addBilling,
    editBilling,
    enabledBilling,
    disabledBilling
}