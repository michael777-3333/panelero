import axios from 'axios';

// const HOST = 'http://localhost:3000/'
const HOST = 'https://proyecto-panelera.onrender.com/'

const service = axios.create({
    baseURL: HOST,
    // validateStatus: function (status) {
    //     return status >= 200 && status < 500;
    // },
    // withCredentials: true,
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