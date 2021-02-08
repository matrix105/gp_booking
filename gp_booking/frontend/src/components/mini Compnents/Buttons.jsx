import { useHistory } from "react-router-dom";
import React from 'react'
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Form from '../Form'
const Buttons = (props) => {
    let history = useHistory();
    var clicked = false
    function handleClick() {
        clicked = true
        console.log(clicked);
        history.push("/register");
    }
    if (props.name === "Sign Up") {
        return (
            <Box mb={4}>
                <Button variant="contained" fullWidth={true} onClick={!clicked ? handleClick : null} type={props.type} color={props.color} >{props.name}</Button>
            </Box>
        )
    }
    return (
        <Box mb={4}>
            <Button variant="contained" fullWidth={true} type={props.type} color={props.color} >{props.name}</Button>
        </Box>
    )
}

export default Buttons