import { request, getToken, url } from '../utils/'

const getPeople = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.persona,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addPeople = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.persona,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editPeople = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.persona}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledPeople = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.persona}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledPeople = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.persona}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getPeople,
    addPeople,
    editPeople,
    enabledPeople,
    disabledPeople
}