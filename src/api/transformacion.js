import { request, getToken, url } from '../utils/';

let token = getToken();

const getTransformation = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.pedido,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get transformation');
    }
}

const addTransformation = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.pedido,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editTransformation = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.pedido}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data
}

const enabledTransformation = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.pedido}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data
}

const disabledTransformation = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.pedido}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data
}

export default {
    addTransformation,
    disabledTransformation,
    editTransformation,
    enabledTransformation,
    getTransformation,
}