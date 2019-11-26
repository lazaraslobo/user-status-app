import React from 'react';
import HomeModule from '../home/home.main';
import LoginComponent from '../login/login.comp';
import SignupComponent from '../signup/signup.comp';

export default [
    {
        path            :   "/",
        component       :   HomeModule,
        exact           :   true,
        route_id        :   "1.0",
        params          :   {}
    },
    {
        path            :   "/login",
        component       :   LoginComponent,
        exact           :   true,
        route_id        :   "2.0",
        params          :   {}
    },
    {
        path            :   "/signup",
        component       :   SignupComponent,
        exact           :   true,
        route_id        :   "3.0",
        params          :   {}
    }
];