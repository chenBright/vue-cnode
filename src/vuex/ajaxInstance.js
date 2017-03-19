import axios from 'axios';

const newAxios = axios.create({
    baseURL: 'https://cnodejs.org/api/v1'
});

export default newAxios;
