import { request, getToken, url } from '../utils/';

let token = getToken();

const getPhase = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.etapa,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get phase');
    }
}

const addPhase = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.etapa,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editPhase = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.etapa}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledPhase = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.etapa}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledPhase = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.etapa}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    addPhase,
    disabledPhase,
    editPhase,
    enabledPhase,
    getPhase,
}