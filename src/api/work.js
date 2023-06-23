import { request, getToken, url } from '../utils/';

let token = getToken();

const getWork = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.labor,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get work');
    }
}

const addWork = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.labor,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editWork = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.labor}/${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledWork = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.labor}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledWork = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.labor}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    addWork,
    disabledWork,
    editWork,
    enabledWork,
    getWork,
}