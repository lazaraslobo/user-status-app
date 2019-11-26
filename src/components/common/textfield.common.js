
import React from 'react';
import TextField from '@material-ui/core/TextField';

export const textFieldOptions = {
    marginNormal_variantOutlined_FW : {
        margin      : "dense",
        fullWidth   : true,
        variant     : "outlined"
    }
}

const textfield = (inputProps) =>{
    return (
        <TextField {...inputProps}/>
    )
}

export default textfield;