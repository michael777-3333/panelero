import { request, getToken, url } from '../utils/'

const getPhase = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.etapa,
            headers: {
                'token': getToken()
            }
        }
    )
    if (status == 200) return data
    return []
}

const addPhase = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.etapa,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const editPhase = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.etapa}${reqData.id}`,
            data: reqData,
            headers: {
                'token': getToken(),
            }
        }
    )
    return data
}

const enabledPhase = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.etapa}activar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

const disabledPhase = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.etapa}desactivar/${id}`,
            headers: {
                'token': getToken()
            }
        }
    )
    return data
}

export default {
    getPhase,
    addPhase,
    editPhase,
    enabledPhase,
    disabledPhase
}