import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _lnks = [];
let _loadingError = null;
let _isLoading = true;

function formatLnk(lnk) {
    return {
        id: lnk._id,
        name: lnk.name,
        urlShort: lnk.urlShort,
        longUrl: lnk.longUrl
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getLnks() {
        return _lnks;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_LNKS_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_LNKS_SUCCESS: {
            _isLoading = false;
            _lnks = action.lnks.map( formatLnk );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_LNKS_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;
