import React from 'react';
import {connect} from 'react-redux';
import {HOME_STATE} from '../core/redux/state-name.map';
import {HOME_SIGN_OUT} from '../core/redux/actions.map'

import Grid from '../common/grid.common';
import GridOptions from '../common/maps/grid-layout.map';

import fetchData from '../core/api/api.service';
import Header from '../common/header.common';
import StatusUpdate from '../status-update/status-update.comp';
import  checkSession from "../helpers/route.protect";

class HomeModule extends React.Component{

    componentWillMount(){
        let isValidHash = checkSession(this.props);
        console.log("is valid hash ", this.props.HOME_STATE);
    }

    render(){        
        const goToRoute = (routeName) =>{
            this.props.history.push(routeName);
            return;
        }

        return(
            <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="Home-Container">
                <Grid {...GridOptions.contRowCenterCenter} item xs={10}>
                    <Header title="Status Summary">
                        <Grid {...GridOptions.contRowCenterCenter} item xs={12} >
                            <Grid item xs={2} onClick={()=>goToRoute("/login")}>
                                <i>Logout</i>
                            </Grid>
                            <Grid item xs={2} onClick={()=>goToRoute("/edit-profile")}>
                                <i>Edit Profile</i>
                            </Grid>
                            <Grid item xs={2} onClick={()=>goToRoute("/view-status")}>
                                <i>View Status</i>
                            </Grid>
                        </Grid>
                    </Header>
                    <Grid {...GridOptions.contRowCenterCenter} item xs={5}>
                        <StatusUpdate />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        HOME_STATE          :   state[HOME_STATE]
    }
}
  
const mapDispatchToProps = dispatch => ({
    signOut    : () =>  dispatch({type : HOME_SIGN_OUT, data : {isUserLoggedIn : true}}),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeModule);