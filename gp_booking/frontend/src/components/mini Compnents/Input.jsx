import React from 'react'
import TextField from '@material-ui/core/TextField';
const Input = (props) => {
    return (
        <TextField id={props.id} fullWidth={true} label={props.label} type={props.type} variant="filled" />
    )
}

export default Input