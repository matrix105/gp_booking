
import React from 'react'
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
const Buttons = (props) => {

    return (
        <Box mb={4}>
            <Button variant="contained" fullWidth={true} type={props.type} color={props.color} id={props.id} >{props.name}</Button>
        </Box>
    )
}

export default Buttons