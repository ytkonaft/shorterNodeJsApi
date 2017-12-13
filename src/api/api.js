import axios from 'axios';

import { apiPrefix } from '../etc/config.json';
 
export default {
    listLnks(userId) {
        return axios.get(`${apiPrefix}/all/${userId}`);
    },
    createLnk(data) {
        return axios.post(`${apiPrefix}/add/`, data);
    },
    deleteLnk(data) {
        return axios.delete(`${apiPrefix}/delete/`, { data: data });
    }
}
