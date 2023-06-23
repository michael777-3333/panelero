import { request, getToken, url } from '../utils/';

let token = getToken();

const getOutlay = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.tipogasto,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get typeOutlay');
    }
}

const addOutlay = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.tipogasto,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editOutlay = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.tipogasto}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const activateOutlay = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.tipogasto}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const desactivateOutlay = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.tipogasto}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    activateOutlay,
    addOutlay,
    desactivateOutlay,
    editOutlay,
    getOutlay,
}