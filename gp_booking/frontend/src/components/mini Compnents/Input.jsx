import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import { func } from 'prop-types';
const Input = (props) => {
    return (
        <Box mb={5}>
            <TextField id={props.id} required fullWidth={true} label={props.label} type={props.type} variant="filled" value={props.value} />
        </Box>
    )
}

export default Input