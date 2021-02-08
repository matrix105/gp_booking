import React from 'react'
import { Box } from '@material-ui/core';
const Title = (props) => {
    return (
        <Box mb={5}>
            <h1>{props.title}</h1>
        </Box>
    )
}

export default Title