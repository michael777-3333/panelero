import { request, getToken, url } from '../utils/'

const getPaymentType = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.tipopago,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addPaymentType = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.tipopago,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editPaymentType = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.tipopago}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledPaymentType = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.tipopago}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledPaymentType = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.tipopago}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getPaymentType,
    addPaymentType,
    editPaymentType,
    enabledPaymentType,
    disabledPaymentType
}