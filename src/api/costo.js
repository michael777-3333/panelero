import { request, getToken, url } from '../utils/';

let token = getToken();

const getCost = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.costo,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get cost');
    }
}

const addCost = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.costo,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editCost = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.costo}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledCost = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.costo}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledCost = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.costo}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    addCost,
    disabledCost,
    editCost,
    enabledCost,
    getCost,
}