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
import DatePicker from '../common/date-picker.common';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            userEmail       :   "",
            userSummary     :   "",
            summaryDate     :   ""
        }
    }

    
    render(){

        const updateStatus = (event) =>{
            event.preventDefault();
            console.log("state is ", this.state);
            fetchData(2, 1, this.state);
        }  

        return(
            <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="Home-Container">
                <Grid item {...GridOptions.contColCenterCenter} xs={12}>
                    <form onSubmit={(event)=>updateStatus(event)}>
                        <TextField
                            required
                            disabled={true}
                            label="Email"
                            value={this.props.HOME_STATE.userDetails.email_id}
                            {...textFieldOptions.marginNormal_variantOutlined_FW}
                        />
                        <DatePicker
                            required 
                            id="date-picker"
                        />
                        <TextField
                            required
                            label="Summary"
                            {...textFieldOptions.marginNormal_variantOutlined_FW}
                            onChange={ev=> this.setState({...this.state, ...{'userSummary' : ev.target.value, summaryDate : document.getElementById("date-picker").value}})}
                        />
                        <Button {...buttonOptions.Contained_FW_Primary} type="submit">submit</Button>
                    </form>
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