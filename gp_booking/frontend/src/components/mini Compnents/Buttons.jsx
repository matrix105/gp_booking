import React from 'react'
import Button from '@material-ui/core/Button';

const Buttons = (props) => {
    return (
        <Button variant="contained" fullWidth={true} color={props.color} type={props.submit} size="large">{props.name}</Button>
    )
}

export default Buttons