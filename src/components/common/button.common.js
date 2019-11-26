import React from 'react';
import Button from '@material-ui/core/Button';

export const buttonOptions = {
    Contained_FW_Primary : {
        variant   :  "contained",
        color     :  "primary",
        fullWidth : true
    }
};

const button = (btnProps) =>{
    return (
        <Button {...btnProps}>
            {btnProps.children}
        </Button>
    )
};

export default button;