import { request, getToken, url } from '../utils/'

const getFarm = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.finca,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addFarm = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.finca,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editFarm = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.finca}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledFarm = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.finca}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledFarm = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.finca}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getFarm,
    addFarm,
    editFarm,
    enabledFarm,
    disabledFarm
}