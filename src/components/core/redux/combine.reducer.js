import LOGIN_REDUCER from '../redux/login-component-reducer/login.reducer';
import HOME_REDUCER from '../redux/Home-module-reducer/home.reducer';
import SIGNUP_REDUCER from '../redux/signup-component-reducer/signup.reducer';

import {
    HOME_STATE,
    LOGIN_STATE,
    SIGNUP_STATE
} from './state-name.map';

import {combineReducers} from 'redux';

const AppState = {};
AppState[HOME_STATE]                    =   HOME_REDUCER;
AppState[LOGIN_STATE]                   =   LOGIN_REDUCER; 
AppState[SIGNUP_STATE]                   =   SIGNUP_REDUCER; 

//Merge all the reducers
const MergeReducers = combineReducers(AppState);

export default  MergeReducers;