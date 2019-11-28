import React from 'react';
import {connect} from 'react-redux';
import checkSession from '../helpers/route.protect';

import {HOME_STATE} from '../core/redux/state-name.map';
import {HOME_SIGN_OUT} from '../core/redux/actions.map'

import Grid from '../common/grid.common';
import GridOptions from '../common/maps/grid-layout.map';

import fetchData from '../core/api/api.service';
import Header from '../common/header.common';
import Button, {buttonOptions} from '../common/button.common';
import {ToastsStore} from 'react-toasts';
import ShowToast from '../common/toast.msg';
import toastsMsg from '../common/maps/toast-msg.map';

class ViewStatusComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            userStatus  :   []
        }
    }

    fetchStatusData = () =>{
        fetchData(8, 1, this.props.HOME_STATE.userDetails).then(result =>{
            this.setState({...this.state, ...{userStatus : result.data.status.length ? result.data.status : []}})
            console.log("result ", result);
        })
    }

    componentWillMount(){
        let isValidHash = checkSession(this.props);
        console.log("is valid hash ", isValidHash);
        this.fetchStatusData();
    }

    render(){
        const goToRoute = (routeName) =>{
            this.props.history.push(routeName);
            return;
        }

        const deleteStatus = (statusID) =>{
            // status_id
            let dataToSend = {
                status_id       : statusID,
                email_id       : this.props.HOME_STATE.userDetails.email_id,
                session_hash    : this.props.HOME_STATE.userDetails.session_hash
            };

            fetchData(9, 1, dataToSend).then(result =>{
                if(result.data.isDeleted){
                    ToastsStore.success(toastsMsg[6]);
                    this.fetchStatusData();
                }
            });
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
                            <Grid item xs={2} onClick={()=>goToRoute("/")}>
                                <i>Home</i>
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
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !this.state.userStatus.length 
                                    ?
                                        <tr>
                                            <td colSpan="4"><h4>No status found</h4></td>
                                        </tr>
                                    :
                                        this.state.userStatus.map((value, index)=>
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{value.date}</td>
                                                <td>{value.summary}</td>
                                                <td>
                                                    <Button {...buttonOptions.Contained_FW_Primary} color="secondary" fullWidth={false}
                                                        onClick={()=>deleteStatus(value.status_id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>)
                                }
                            </tbody>
                        </table>
                    </Grid>
                    <ShowToast store={ToastsStore}/>
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