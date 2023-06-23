import { request, getToken, url } from '../utils/';

let token = getToken();

const getStore = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.bodega,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get store');
    }
}

const addStore = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.bodega,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editStore = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.bodega}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledStore = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.bodega}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledStore = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.bodega}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    addStore,
    disabledStore,
    editStore,
    enabledStore,
    getStore,
};