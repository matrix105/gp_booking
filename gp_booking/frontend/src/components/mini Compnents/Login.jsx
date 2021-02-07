import React from 'react'
import '../css/login.css'
import Input from './Input'
import Buttons from './Buttons'
import { Typography, Box } from '@material-ui/core';
const Login = (props) => {

    return (
        <form autoComplete="off" className="form">
            <Box mt={5}>
                <h1>{props.title}</h1>
                <Box mb={4} mt={5}>
                    {
                        props.inputs.forEach(input => {
                            <Input
                                label={props.inputs[0].label}
                                id={props.inputs[0].id}
                                type={props.inputs[0].type}
                            />
                        })
                    }
                    <Input
                        label={props.inputs[0].label}
                        id={props.inputs[0].id}
                        type={props.inputs[0].type}
                    />
                </Box>
                <Input
                    label={props.inputs[1].label}
                    id={props.inputs[1].id}
                    type={props.inputs[1].type}
                />



                <div className="buttons">
                    <Box mb={4}>
                        <Buttons
                            color={props.buttons[0].color}
                            name={props.buttons[0].name}
                            type={props.buttons[0].type}
                        />
                    </Box>
                    <Box>
                        <Buttons
                            color="default"
                            name="Register"
                            size="large"

                        />
                    </Box>

                </div>
            </Box>
        </form>
    )
}

export default Login