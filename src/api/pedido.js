import { request, getToken, url } from '../utils/';

let token = getToken();

const getOrder = async () => {
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
        throw new Error('Failed to get order');
    }
}

const addOrder = async (reqData) => {
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

const editOrder = async (reqData) => {
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

const enabledOrder = async (id) => {
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

const disabledOrder = async (id) => {
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
    addOrder,
    disabledOrder,
    editOrder,
    enabledOrder,
    getOrder,
}