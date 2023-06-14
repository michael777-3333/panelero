import axios from 'axios';

// const HOST = 'http://10.202.80.99:3000/'
const HOST = 'http://10.202.80.75:3000/'
// const HOST = 'http://192.168.1.4:3000/'
// const HOST = 'http://localhost:3000/'
// const HOST = 'https://proyecto-panelera.onrender.com/'

const service = axios.create({
    baseURL: HOST,
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    },
    // timeout: 5000
});

// service.interceptors.request.use(
//     (config) => {
//         return config;
//     },
//     (error) => {
//         console.log(error);
//         return Promise.reject();
//     }
// );
// service.interceptors.response.use(
//     (response) => {
//         if (response.status === 200) {
//             return response;
//         } else {
//             Promise.reject();
//         }
//     },
//     (error) => {
//         console.log(error);
//         return Promise.reject();
//     }
// );

export default service;
// export default url