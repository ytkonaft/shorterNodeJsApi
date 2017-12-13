import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';


import api from '../api/api';

const LnkActions = {
    loadLnks(userId) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_LNKS_REQUEST
        });

        api.listLnks(userId)
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
            this.loadLnks(lnk.user)
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteLnk(lnk) {
        console.log(lnk);
        api.deleteLnk(lnk)
        .then(() =>
            this.loadLnks(lnk.user)
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default LnkActions;