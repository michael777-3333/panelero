import { request, getToken, url } from '../utils/'

const getAllotment = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.lote,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addAllotment = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.lote,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editAllotment = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.lote}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledAllotment = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.lote}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledAllotment = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.lote}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getAllotment,
    addAllotment,
    editAllotment,
    enabledAllotment,
    disabledAllotment
}