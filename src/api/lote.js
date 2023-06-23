import { request, getToken, url } from '../utils/';

let token = getToken();

const getAllotment = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.lote,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get Alloment');
    }
}

const addAllotment = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'post',
            url: url.lote,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editAllotment = async (reqData) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.lote}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledAllotment = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.lote}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledAllotment = async (id) => {
    const { data, status} = await request(
        {
            method: 'put',
            url: `${url.lote}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    getAllotment,
    addAllotment,
    editAllotment,
    enabledAllotment,
    disabledAllotment
}