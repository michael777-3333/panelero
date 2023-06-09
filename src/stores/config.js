import axios from 'axios';
import { Cookies } from 'quasar';

// outside of a Vue file
const cookies = Cookies.getAll()
export const token = cookies.token

// const HOST = 'http://10.202.80.99:3000/'
const HOST = 'http://10.202.80.34:3000/'
// const HOST = 'http://192.168.1.6:3000/'
// const HOST = 'http://localhost:3000/'
// const HOST = 'https://proyecto-panelera.onrender.com/'

const url = {
    autenticacion: 'auth/',
    bodega:        'bodega/',
    costo:         'costo/',
    etapa:         'etapa/',
    facturacion:   'facturacion/',
    finca:         'granja/',
    inventario:    'inventario/',
    lote:          'lote/',
    marca:         'marca/',
    pedido:        'pedido/',
    persona:       'persona/',
    usuario:       'usuario/',
}

export const instanceAxios = axios.create({
    baseURL: HOST,
});

export default url