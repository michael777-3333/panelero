import { Cookies } from 'quasar'

const TokenKey = 'x-auth-token';

/**
 * Obtine el token desde las cookies
 *
 * @returns {string} El token.
 */

const getToken = () => {
    return Cookies.get(TokenKey) || '';
}

const setToken = (token) => {
    Cookies.set(TokenKey, token, { expires: "10h" })
}

const removeToken = () => {
    // Cookies.set('token', '')
    Cookies.remove(TokenKey)
    // router.push('/login');
}

export { getToken, setToken, removeToken}
// export { getToken, setToken, removeToken, redirect, saveRedirect, saveUrl, getUrl }