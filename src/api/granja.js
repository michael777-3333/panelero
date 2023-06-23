import { request, getToken, url } from '../utils/';

let token = getToken();

const getFarm = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.finca,
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

const addFarm = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.finca,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editFarm = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.finca}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledFarm = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.finca}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledFarm = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.finca}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    addFarm,
    disabledFarm,
    editFarm,
    enabledFarm,
    getFarm,
}