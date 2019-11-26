import React, {useState} from 'react';
import {connect} from 'react-redux';
import {HOME_STATE} from '../core/redux/state-name.map';
import {LOGIN_SUCCESS, HOME_SIGN_OUT} from '../core/redux/actions.map'

import Grid from '../common/grid.common';
import GridOptions from '../maps/grid-layout.map';

import Button,{buttonOptions} from '../common/button.common';
import TextField, {textFieldOptions} from '../common/textfield.common';

import fetchData from '../core/api/api.service';
import Header from '../common/header.common';

class HomeModule extends React.Component{
    constructor(){
        super();
        this.state = {
            userEmail       :   undefined,
            userPassword    :   undefined
        }
    }

    render(){
        const userWantsToLogin = (event) =>{
            event.preventDefault();
        }

        const handleInputs = (ev, inpID)=>{
            let tempObj = {};
            tempObj[inpID] = ev.target.value;
            this.setState({...this.state, ...tempObj});
        }

        return(
            <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="Home-Container">
                <Grid {...GridOptions.contRowCenterCenter} item xs={10} className="generic-conainer">
                    <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="common-header">
                        <Header title="Login to continue">
                            <i onClick={()=>this.props.history.push("/signup")}>Sign up</i>
                        </Header>
                    </Grid>
                    
                    <Grid item {...GridOptions.contColCenterCenter} xs={12}>
                        <Grid item {...GridOptions.contRowCenterCenter} xs={5}>
                            <form onSubmit={(event)=>userWantsToLogin(event)}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    {...textFieldOptions.marginNormal_variantOutlined_FW}
                                    onKeyUp={(ev)=> handleInputs(ev, 'userEmail')}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="password"
                                    {...textFieldOptions.marginNormal_variantOutlined_FW}
                                    onKeyUp={(ev)=> handleInputs(ev, 'userPassword')}

                                />
                                <Button {...buttonOptions.Contained_FW_Primary} type="submit">Login</Button>
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
)(HomeModule);