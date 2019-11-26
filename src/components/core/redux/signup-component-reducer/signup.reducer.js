import {
    LOGIN_SUCCESS
} from '../actions.map';

const initialState = {
    isUserLoggedIn  : false
};

const updateHomePageData = (oldState, newData) => {
    let newState = {...oldState, isDataLoaded : true, homeScrnPageData : newData};
    return newState;
};

const signUp = (state = initialState, action) => {
    const dataToUpdate      =  action.data;

    switch(action.type){
        case LOGIN_SUCCESS          :   return updateHomePageData(state, dataToUpdate);
        default                     :   return state;
    }
}

export default signUp;