import React from 'react'
import './css/login.css'
import Image from './mini Compnents/Image'
import Input from './mini Compnents/Input'
import Buttons from './mini Compnents/Buttons'
import { loginInput, registerInput } from './mini Compnents/inputs'
import Messages from './mini Compnents/Messages'
import { Box } from '@material-ui/core';

const Form = (props) => {
  var loginOrSignup = {}
  const params = props.url
  if (params === "login") {
    loginOrSignup = loginInput
  } else {
    loginOrSignup = registerInput
  }
  function createImage(image) {
    return (
      <Image
        className="img"
        alt={image.alt}
        src={image.src}
      />
    )
  }
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
        {(loginOrSignup.image).map(createImage)}
        <div className="middle">
          <div className="text">
            {(loginOrSignup.messages).map(createMessage)}
          </div>

        </div>
      </div>
      <form autoComplete="off" className="form">
        <Box mt={5}>
          <h1>{loginOrSignup.title}</h1>
          <Box mb={4} mt={5}>
            {(loginOrSignup.inputs).map(createInput)}
          </Box>

          <div className="buttons">
            <Box mb={4}>
              {(loginOrSignup.buttons.map(createButton))}
            </Box>
          </div>
        </Box>
      </form>
    </div>

  )
}

export default Form;