import React from 'react';
import {connect} from 'react-redux';
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
            userEmail       :   "",
            userPassword    :   "",
            firstName       :   "",
            lastName        :   "",
            age             :   "",
            phone           :   ""
        }
    }

    
    render(){
        const createNewAccount = (event) =>{
            event.preventDefault();
            console.log("state is ", this.state);
            fetchData(2, 1, this.state);
        }

        return(
            <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="Home-Container">
                <Grid {...GridOptions.contRowCenterCenter} item xs={10} className="generic-conainer">
                    <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="common-header">
                        <Header title="Update Status">
                            <i onClick={()=>this.props.history.push("/login")}>Sign-out</i>
                        </Header>
                    </Grid>
                    
                    <Grid item {...GridOptions.contColCenterCenter} xs={12}>
                        <Grid item {...GridOptions.contRowCenterCenter} xs={5}>
                            <form onSubmit={(event)=>createNewAccount(event)}>
                                <TextField
                                    required
                                    id="userEmail"
                                    readonly
                                    label="Email"
                                    {...textFieldOptions.marginNormal_variantOutlined_FW}
                                    onChange={ev=> this.setState({...this.state, ...{'userEmail' : ev.target.value}})}
                                />
                                <TextField
                                    required
                                    id="userPassword"
                                    label="Summary"
                                    {...textFieldOptions.marginNormal_variantOutlined_FW}
                                    onChange={ev=> this.setState({...this.state, ...{'userPassword' : ev.target.value}})}

                                />
                                <Button {...buttonOptions.Contained_FW_Primary} type="submit">Create Account</Button>
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