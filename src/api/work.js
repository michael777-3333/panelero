import { request, getToken, url } from '../utils/'

const getWork = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.labor,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addWork = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.labor,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editWork = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.labor}/${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledWork = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.labor}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledWork = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.labor}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getWork,
    addWork,
    editWork,
    enabledWork,
    disabledWork
}