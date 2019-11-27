import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const DatePicker = (dateProps) =>{
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                fullWidth
            />
        </MuiPickersUtilsProvider>
    )
}

export default DatePicker;