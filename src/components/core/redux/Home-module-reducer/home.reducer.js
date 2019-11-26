import {
    LOGIN_SUCCESS,
    HOME_SIGN_OUT
} from '../actions.map';

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
    statusSummary : []    
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