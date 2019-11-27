import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const todayDate = () =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

const DatePicker = (dateProps) =>{
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="dense"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="yyyy-MM-dd"
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                fullWidth
                {...dateProps}
                disableFuture
                disablePast
                emptyLabel=""
                value={todayDate()}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DatePicker;