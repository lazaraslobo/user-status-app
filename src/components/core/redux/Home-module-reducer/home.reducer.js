import {
    LOGIN_SUCCESS,
    HOME_SIGN_OUT
} from '../actions.map';

import { getLocalStorage } from '../../../utilities/local-storage.util';

//Component InitialState
const initialState = {
    isUserLoggedIn  : false,
    userDetails     : {
        firstName   : undefined,
        lastName    : undefined,
        branch      : undefined,
        email       : undefined,
        phone       : undefined,
    },
    statusSummary   : [],
    session_hash    : getLocalStorage() && getLocalStorage().session_hash ? getLocalStorage().session_hash : undefined     
};

/* Home Screen Data information */
const updateLoginStatus = (oldState, newData) => {
    let newState = {...oldState, ...newData};
    return newState;
};

/* Home Component State */
const HomeReducer = (state = initialState, action) => {
    const dataToUpdate      =  action.data;

    switch(action.type){
        case LOGIN_SUCCESS          :   return updateLoginStatus(state, dataToUpdate);
        case HOME_SIGN_OUT          :   return updateLoginStatus(state, dataToUpdate)
        default                     :   return state;
    }
}

export default HomeReducer;