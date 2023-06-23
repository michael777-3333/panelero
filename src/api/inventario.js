import { request, getToken, url } from '../utils/';

let token = getToken();

const getInventory = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.inventario,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get inventary');
    }
}

const addInventory = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.inventario,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editInventory = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.inventario}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledInventory = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.inventario}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledInventory = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.inventario}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    addInventory,
    disabledInventory,
    editInventory,
    enabledInventory,
    getInventory,
}