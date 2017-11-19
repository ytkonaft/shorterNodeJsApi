import axios from 'axios';

import { apiPrefix } from '../etc/config.json';

export default {
    listLnks() {
        return axios.get(`${apiPrefix}/all/`);
    },

    createLnk(data) {
        return axios.post(`${apiPrefix}/add/`, data);
    },

    deleteLnk(lnkId) {
        return axios.delete(`${apiPrefix}/delete/${lnkId}`);
    }
}
