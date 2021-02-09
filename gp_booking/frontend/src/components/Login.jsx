import React from 'react'
import './css/login.css'
import Image from './mini Compnents/Image'
import Title from './mini Compnents/Title'
import Input from './mini Compnents/Input'
import Button from './mini Compnents/Buttons'
import { loginInput } from './mini Compnents/inputs'
import Messages from './mini Compnents/Messages'
import { useHistory } from "react-router-dom";
import { Container } from '@material-ui/core'

function Login() {

    let history = useHistory();
    console.log(loginInput.messages);

    function getInput(props) {
        return (
            <Input
                id={props.id}
                label={props.label}
                type={props.type}
            />
        )
    }
    function getButton(props) {
        if (props.name === "Sign Up") {
            function handleClick() {
                history.push("/register");
            }
            /* if (props.name === "Sign Up") {
                return (
                    <Box mb={4}>
                        <Button variant="contained" fullWidth={true} onClick={!clicked ? handleClick : null} type={props.type} color={props.color} >{props.name}</Button>
                    </Box>
                )
            } */
            return (
                <Button
                    type="button"
                    color={props.color}
                    name={props.name}
                    onClick={handleClick}
                />)
        } else {
            return (
                <Button
                    type={props.type}
                    color={props.color}
                    name={props.name}
                />)
        }

    }
    function getImage(props) {
        return (
            <Image
                className="img"
                src={props.src}
                alt={props.alt}
            />)
    }
    function getMessage(message) {
        return (
            <Messages
                message={message}
            />
        )
    }

    return (
        <Container>
        <div className="containers" style={{ margin: "0px", padding: "0px" }}>
            <div className="imageContainer">
                {(loginInput.image).map(getImage)}
                <div className="middle">
                    <div className="text">
                        {(loginInput.messages).map(getMessage)}
                    </div>
                </div>
            </div>

            <form autoComplete="off" className="form" action="/Login" method="POST">
                <Title
                    title={loginInput.title}
                />
                {(loginInput.inputs).map(getInput)}
                {(loginInput.buttons).map(getButton)}
            </form>
        </div>
        </Container>
    )
}

export default Login