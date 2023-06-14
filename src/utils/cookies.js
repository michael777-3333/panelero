import { Cookies } from 'quasar'

/**
 * Obtine el token desde las cookies
 *
 * @returns {string} El token.
 */
const getToken = () => {
    return Cookies.get('token')
}

const savedToken = (token) => {
    Cookies.set('token', token, { expires: "10h", })
}

const deleteToken = () => {
    Cookies.remove('token')
}

export {deleteToken, getToken, savedToken}