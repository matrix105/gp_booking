import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
const Input = (props) => {
    return (
        <Box mb={5}>
            <TextField id={props.id} fullWidth={true} label={props.label} type={props.type} variant="filled" />
        </Box>
    )
}

export default Input