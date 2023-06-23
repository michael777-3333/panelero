import { request, getToken, url } from '../utils/';

let token = getToken();

const getBilling = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.facturacion,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get billing');
    }
}

const addBilling = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.facturacion,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editBilling = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.facturacion}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledBilling = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.facturacion}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledBilling = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.facturacion}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    addBilling,
    disabledBilling,
    editBilling,
    enabledBilling,
    getBilling,
}