import React from 'react';
import {connect} from 'react-redux';
import checkSession from '../helpers/route.protect';

import {HOME_STATE} from '../core/redux/state-name.map';
import {HOME_SIGN_OUT} from '../core/redux/actions.map'

import Grid from '../common/grid.common';
import GridOptions from '../common/maps/grid-layout.map';

import fetchData from '../core/api/api.service';
import Header from '../common/header.common';

class ViewStatusComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            userStatus  :   []
        }
    }

    componentWillMount(){
        let isValidHash = checkSession(this.props);
        console.log("is valid hash ", isValidHash);
        fetchData(8, 1, this.props.HOME_STATE.userDetails).then(result =>{
            this.setState({...this.state, ...{userStatus : result.data.status}})
            console.log("result ", result);
        })
    }

    render(){
        const goToRoute = (routeName) =>{
            this.props.history.push(routeName);
            return;
        }

        return(
            <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="Home-Container">
                <Grid {...GridOptions.contRowCenterCenter} item xs={10}>
                    <Header title="Total Status">
                        <Grid {...GridOptions.contRowCenterCenter} item xs={12} >
                            <Grid item xs={2} onClick={()=>goToRoute("/login")}>
                                <i>Logout</i>
                            </Grid>
                            <Grid item xs={2} onClick={()=>goToRoute("/edit-profile")}>
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
                                {
                                    this.state.userStatus.map((value, index)=>
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{value.date}</td>
                                            <td>{value.summary}</td>
                                        </tr>
                                    )
                                }
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