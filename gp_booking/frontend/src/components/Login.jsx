import { React, useState, useReducer } from "react";
import "./css/login.css";
import Image from "./mini Compnents/Image";
import Title from "./mini Compnents/Title";
import { loginInput } from "./mini Compnents/inputs";
import Messages from "./mini Compnents/Messages";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Box, Button, TextField } from '@material-ui/core';
import axios from "axios";


const initialForm = {
  nhs: '',
  password: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'handle_input_text':
      console.log(action.payload);
      return {
        ...state,
        [action.field]: action.payload

      }
    case 'login':
      return {

      }
    case 'register':
      return {

      }
    default:
      return {}
  }
}

function Login() {
  let history = useHistory();

  const [state, dispatch] = useReducer(reducer, initialForm)

  const handleTextChange = (e) => {
    dispatch({
      type: 'handle_input_text',
      field: e.target.name,
      payload: e.target.value
    })
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log('heeloo');
    dispatch({
      type: 'login'
    })
  }

  function getImage(props) {
    return <Image className="img" src={props.src} alt={props.alt} />;
  }
  function getMessage(message) {
    return <Messages message={message} />;
  }

  return (
    <Container>
      <div className="containers" style={{ margin: "0px", padding: "0px" }}>
        <div className="imageContainer">
          {loginInput.image.map(getImage)}
          <div className="middle">
            <div className="text">{loginInput.messages.map(getMessage)}</div>
          </div>
        </div>

        <form autoComplete="off" className="form" method="POST" >
          <Title title={loginInput.title} />
          <Box mb={5}>
            <TextField
              id="outlined-basic"
              label="NHS number"
              variant="outlined"
              type="number"
              className="form-control"
              value={state.nhs}
              name="nhs"
              required
              onChange={(e) => handleTextChange(e)}
            />
          </Box>
          <Box mb={5}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              className="form-control"
              value={state.password}
              name="password"
              required
              onChange={(e) => handleTextChange(e)}
            />
          </Box>
          <Container>
            <Button onClick={handleButtonClick} variant="contained" fullWidth="true" color="primary" type="submit" className="btn btn-primary mb-5">
              Login
            </Button>
            <Button variant="contained" fullWidth="true" color="secondary" type="button" className="btn btn-primary mb-5">
              Submit
            </Button>
          </Container>

        </form>
      </div>
    </Container>
  );
}

export default Login;
