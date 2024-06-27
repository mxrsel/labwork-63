import axios from 'axios';
const AxiosApi = axios.create({
    baseURL: 'https://marsel-js-25-default-rtdb.europe-west1.firebasedatabase.app/'
});



export default AxiosApi;