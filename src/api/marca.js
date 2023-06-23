import { request, getToken, url } from '../utils/';

let token = getToken();

const getMark = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.marca,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get mark');
    }
}

const addMark = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.marca,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editMark = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.marca}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledMark = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.marca}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledMark = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.marca}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    addMark,
    disabledMark,
    editMark,
    enabledMark,
    getMark,
}