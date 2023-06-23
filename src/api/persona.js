import { request, getToken, url } from '../utils/';

let token = getToken();

const getPeople = async () => {
    const { data, status } = await request(
        {
            method: 'get',
            url: url.persona,
            headers: {
                token
            }
        }
    )
    if (status === 200) {
        return data;
    } else {
        throw new Error('Failed to get people');
    }
}

const addPeople = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'post',
            url: url.persona,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const editPeople = async (reqData) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.persona}${reqData.id}`,
            data: reqData,
            headers: {
                token,
            }
        }
    )
    return data;
}

const enabledPeople = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.persona}activar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

const disabledPeople = async (id) => {
    const { data, status } = await request(
        {
            method: 'put',
            url: `${url.persona}desactivar/${id}`,
            headers: {
                token
            }
        }
    )
    return data;
}

export default {
    addPeople,
    disabledPeople,
    editPeople,
    enabledPeople,
    getPeople,
}