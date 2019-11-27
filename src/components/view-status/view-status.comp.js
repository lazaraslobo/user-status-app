import React from 'react';
import {connect} from 'react-redux';
import {HOME_STATE} from '../core/redux/state-name.map';
import {HOME_SIGN_OUT} from '../core/redux/actions.map'

import Grid from '../common/grid.common';
import GridOptions from '../common/maps/grid-layout.map';

import fetchData from '../core/api/api.service';
import Header from '../common/header.common';

class ViewStatusComponent extends React.Component{
    render(){
        // if(!this.props.HOME_STATE.isUserLoggedIn){
        //     this.props.history.push("/login");
        //     return false;
        // }

        return(
            <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="Home-Container">
                <Grid {...GridOptions.contRowCenterCenter} item xs={10}>
                    <Header title="Total Status">
                        <Grid {...GridOptions.contRowCenterCenter} item xs={12} >
                            <Grid item xs={2}>
                                <i>Logout</i>
                            </Grid>
                            <Grid item xs={2}>
                                <i>Edit Profile</i>
                            </Grid>
                        </Grid>
                    </Header>
                    <Grid {...GridOptions.contRowCenterCenter} item xs={10}>
                        <table>
                            <thead>
                                <tr>
                                    <th>SL. No</th>
                                    <th>Date</th>
                                    <th>Summary Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2019-11-07</td>
                                    <td>Worked on boot strap</td>
                                </tr>
                            </tbody>
                        </table>
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
)(ViewStatusComponent);