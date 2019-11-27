import React from 'react';
import {connect} from 'react-redux';
import checkSession from '../helpers/route.protect';

import {HOME_STATE} from '../core/redux/state-name.map';
import {LOGIN_SUCCESS, HOME_SIGN_OUT} from '../core/redux/actions.map'

import Grid from '../common/grid.common';
import GridOptions from '../common/maps/grid-layout.map';

import Button,{buttonOptions} from '../common/button.common';
import TextField, {textFieldOptions} from '../common/textfield.common';

import fetchData from '../core/api/api.service';
import Header from '../common/header.common';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            userEmail       :  "",
            userPassword    :  "",
            firstName       :  "",
            lastName        :  "",
            phone           :  ""
        }
    }
    
    
    componentWillMount(){
        let isValidHash = checkSession(this.props);
        console.log("is valid hash ", this.props.HOME_STATE);
        let userObj = {
            userEmail       :  this.props.HOME_STATE.userDetails.email_id,
            firstName       :  this.props.HOME_STATE.userDetails.first_name,
            lastName        :  this.props.HOME_STATE.userDetails.last_name,
            phone           :  this.props.HOME_STATE.userDetails.phone,
            session_hash    :  this.props.HOME_STATE.userDetails.session_hash,
        }

        this.setState({
            ...this.state, 
            ...userObj
        })

        console.log("here ", userObj);
    }

    render(){
        const createNewAccount = (event) =>{
            event.preventDefault();
            console.log("state is ", this.state);
            fetchData(3, 1, this.state).then(result =>{
                
            });
        }

        return(
            <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="Home-Container">
                <Grid {...GridOptions.contRowCenterCenter} item xs={10} className="generic-conainer">
                    <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="common-header">
                        <Header title="Edit Profile">
                            <Grid {...GridOptions.contRowCenterCenter} item xs={12} >
                                <Grid item {...GridOptions.contRowCenterCenter} xs={2}>
                                    <i onClick={()=>this.props.history.push("/login")}>Logout</i>
                                </Grid>
                                <Grid item {...GridOptions.contRowCenterCenter} xs={2}>
                                    <i onClick={()=>this.props.history.push("/")}>Home</i>
                                </Grid>
                            </Grid>
                        </Header>
                    </Grid>
                    
                    <Grid item {...GridOptions.contColCenterCenter} xs={12}>
                        <Grid item {...GridOptions.contRowCenterCenter} xs={5}>
                            <form onSubmit={(event)=>createNewAccount(event)}>
                                <TextField
                                    required
                                    id="firstName"
                                    label="First Name"
                                    {...textFieldOptions.marginNormal_variantOutlined_FW}
                                    onChange={ev=> this.setState({...this.state, ...{'firstName' : ev.target.value}})}
                                    value={this.state.firstName}
                                />
                                <TextField
                                    required
                                    id="lastName"
                                    label="Last Name"
                                    {...textFieldOptions.marginNormal_variantOutlined_FW}
                                    onChange={ev=> this.setState({...this.state, ...{'lastName' : ev.target.value}})}
                                    value={this.state.lastName}
                                />
                                <TextField
                                    required
                                    id="userEmail"
                                    label="Email"
                                    disabled
                                    value={this.state.userEmail}
                                    {...textFieldOptions.marginNormal_variantOutlined_FW}
                                    onChange={ev=> this.setState({...this.state, ...{'userEmail' : ev.target.value}})}
                                />
                                <TextField
                                    required
                                    id="userPhone"
                                    label="Phone"
                                    value={this.state.phone}
                                    {...textFieldOptions.marginNormal_variantOutlined_FW}
                                    onChange={ev=> this.setState({...this.state, ...{'phone' : ev.target.value}})}
                                />
                                <TextField
                                    required
                                    id="userPassword"
                                    label="Password"
                                    type="password"
                                    {...textFieldOptions.marginNormal_variantOutlined_FW}
                                    onChange={ev=> this.setState({...this.state, ...{'userPassword' : ev.target.value}})}
                                />
                                <Button {...buttonOptions.Contained_FW_Primary} type="submit">Update</Button>
                            </form>
                        </Grid>
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
    signOut    : () =>  dispatch({type : HOME_SIGN_OUT, data : {isUserLoggedIn : false}}),
    signIn    : () =>  dispatch({type : LOGIN_SUCCESS, data : {isUserLoggedIn : true}}),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);