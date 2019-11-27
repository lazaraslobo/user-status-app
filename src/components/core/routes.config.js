import React from 'react';
import HomeModule from '../home/home.main';
import LoginComponent from '../login/login.comp';
import SignupComponent from '../signup/signup.comp';
import StatusUpdateComponent from '../status-update/status-update.comp';
import EditProfileComponent from '../edit-profile/edit-profile.comp';

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
    },
    {
        path            :   "/status-update",
        component       :   StatusUpdateComponent,
        exact           :   true,
        route_id        :   "4.0",
        params          :   {}
    },
    {
        path            :   "/edit-profile",
        component       :   EditProfileComponent,
        exact           :   true,
        route_id        :   "5.0",
        params          :   {}
    },
    {
        path            :   "/page-not-found",
        component       :   ()=><h3>Requested Page was not found</h3>,
        exact           :   true,
        route_id        :   "5.0",
        params          :   {}
    }
];