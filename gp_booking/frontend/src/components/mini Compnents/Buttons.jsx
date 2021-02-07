import React from 'react'
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
const Buttons = (props) => {
    return (
        <Box mb={4} height="100%">
            <Button variant="contained" fullWidth={true} color={props.color} type={props.submit}>{props.name}</Button>
        </Box>
    )
}

export default Buttons