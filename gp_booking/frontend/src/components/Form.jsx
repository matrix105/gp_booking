import React from 'react'
import './css/login.css'
import Image from './mini Compnents/Image'
import Input from './mini Compnents/Input'
import Buttons from './mini Compnents/Buttons'
import loginInput from './mini Compnents/inputs'
import Messages from './mini Compnents/Messages'
import { Box } from '@material-ui/core';

const Form = () => {

    function createInput(input) {
        return (
            <Input
                label={input.label}
                id={input.id}
                type={input.type}
            />)
    }
    function createButton(button) {
        return (
            <Buttons
                color={button.color}
                name={button.name}
                type={button.type}
            />
        )
    }

    function createMessage(message) {
        return (
            <Messages
                message={message}
            />
        )
    }
    return (
        <div className="containers" style={{ margin: "0px", padding: "0px" }}>
            <div className="imageContainer">
                <Image
                    className="img"
                    alt={loginInput.alt}
                    src={loginInput.img}
                />
                <div className="middle">
                    <div className="text">
                        {(loginInput.messages).map(createMessage)}
                    </div>

                </div>
            </div>
            <form autoComplete="off" className="form">
                <Box mt={5}>
                    <h1>{loginInput.title}</h1>
                    <Box mb={4} mt={5}>
                        {(loginInput.inputs).map(createInput)}
                    </Box>

                    <div className="buttons">
                        <Box mb={4}>
                            {(loginInput.buttons.map(createButton))}
                        </Box>

                    </div>
                </Box>
            </form>
        </div>

    )
}

export default Form;