import { request, getToken, url } from '../utils/'

const getMark = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.marca,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addMark = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.marca,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editMark = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.marca}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledMark = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.marca}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledMark = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.marca}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getMark,
    addMark,
    editMark,
    enabledMark,
    disabledMark
}