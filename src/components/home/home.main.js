import React from 'react';
import {connect} from 'react-redux';
import {HOME_STATE} from '../core/redux/state-name.map';
import {HOME_SIGN_OUT} from '../core/redux/actions.map'

import Grid from '../common/grid.common';
import GridOptions from '../common/maps/grid-layout.map';

import fetchData from '../core/api/api.service';
import Header from '../common/header.common';

class HomeModule extends React.Component{
    render(){
        if(!this.props.HOME_STATE.isUserLoggedIn){
            this.props.history.push("/login");
            return false;
        }

        return(
            <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="Home-Container">
                <Grid {...GridOptions.contRowCenterCenter} item xs={10}>
                    <Header title="Welcome">
                        <i>Logout</i>
                    </Header>
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