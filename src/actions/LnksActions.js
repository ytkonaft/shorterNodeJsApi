import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';


import api from '../api/api';

const LnkActions = {
    loadLnks() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_LNKS_REQUEST
        });

        api.listLnks()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_LNKS_SUCCESS,
                lnks: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_LNKS_FAIL,
                error: err
            })
        );
    },

    createLnks(lnk) {
        api.createLnk(lnk)
        .then(() =>
            this.loadLnks()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteLnk(lnkId) {
        api.deleteLnk(lnkId)
        .then(() =>
            this.loadLnks()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default LnkActions;