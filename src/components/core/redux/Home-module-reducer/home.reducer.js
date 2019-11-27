import {
    LOGIN_SUCCESS,
    HOME_SIGN_OUT,
    UPDATE_USER_DETAILS
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

if(Object.keys(getLocalStorage()).length){
    initialState.userDetails = {...getLocalStorage()};
    console.log("new state", initialState)

}else{
    console.log("initial state")
}

/* Home Screen Data information */
const updateLoginStatus = (oldState, newData) => {
    let newState = {...oldState, ...newData};
    return newState;
};

const setUserDetails = (oldState, newData) =>{
    let newState = {...oldState, ...{userDetails : {...newData}}};
    return newState;
}

/* Home Component State */
const HomeReducer = (state = initialState, action) => {
    const dataToUpdate      =  action.data;

    switch(action.type){
        case LOGIN_SUCCESS          :   return updateLoginStatus(state, dataToUpdate);
        case HOME_SIGN_OUT          :   return updateLoginStatus(state, dataToUpdate);
        case UPDATE_USER_DETAILS    :   return setUserDetails(state, dataToUpdate);
        default                     :   return state;
    }
}

export default HomeReducer;