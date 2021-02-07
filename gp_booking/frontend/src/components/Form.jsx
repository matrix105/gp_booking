import React from 'react'
import './css/login.css'
import Image from './mini Compnents/Image'
import Login from './mini Compnents/Login'
import loginInput from './mini Compnents/inputs'
import Messages from './mini Compnents/Messages'

const Form = () => {

    function createMessage(message) {
        return (
            <Messages
                message={message}
            />
        )
    }
    return (
        <div className="container">
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

            <Login
                title={loginInput.title}
                inputs={loginInput.inputs}
                buttons={loginInput.buttons}
            />

        </div>

    )
}

export default Form;