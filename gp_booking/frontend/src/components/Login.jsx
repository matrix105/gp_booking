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
  email: '',
  password: '',
  isClicked: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'handle_input_text':
      return {
        ...state,
        [action.field]: action.payload

      }
    case 'login':

      axios.post('http://localhost:1337/auth/local', {
        identifier: state.email,
        password: state.password
      })
        .then(response => {
          // console.log(response.data.user.email);
          action.redirect.push({
            pathname: '/booking',
            state: { data: response.data.user.id }
          })
        })
        .catch(err => {
          console.log(err.response.data[0]);
          // console.log(err.message[0].messages[0].message);
        })
      return {
        ...state,
        [state.isClicked]: true
      }
    case 'register':
      action.redirect.push('/register')
      return
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
    dispatch({
      type: 'login',
      payload: e.target.value,
      redirect: history
    })
  }

  const redirectRegister = (e) => {
    dispatch({
      type: 'register',
      redirect: history
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

        <form autoComplete="off" className="form" onSubmit={handleButtonClick}>
          <Title title={loginInput.title} />
          <Box mb={5}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="text"
              className="form-control"
              value={state.email}
              name="email"
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
            <Button value={state.isClicked} type="submit" variant="contained" fullWidth="true" color="primary" className="btn btn-primary mb-5">
              Login
            </Button>
            <Button onClick={e => redirectRegister(e)} variant="contained" fullWidth="true" color="secondary" type="button" className="btn btn-primary mb-5">
              Sign up
            </Button>
          </Container>

        </form>
      </div>
    </Container>
  );
}

export default Login;
