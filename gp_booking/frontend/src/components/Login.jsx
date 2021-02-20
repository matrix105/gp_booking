import { React, useState } from "react";
import "./css/login.css";
import Image from "./mini Compnents/Image";
import Title from "./mini Compnents/Title";
import { loginInput } from "./mini Compnents/inputs";
import Messages from "./mini Compnents/Messages";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Box, Button, TextField } from '@material-ui/core';
import axios from "axios";
import { func } from "prop-types";
// var passwordHash = require('password-hash');

function Login() {
  let history = useHistory();

  const [loginDetail, setLoginDetail] = useState({
    nhs: "",
    password: ""
  })
  /* 
    var clicked = false
    function handleSignup() {
      clicked = true
      if (clicked) {
        history.push('/register')
      }
    } */

  function handleInput(event) {

    const { value, name } = event.target
    setLoginDetail((prevValue) => {
      if (name === "nhs") {

        return {
          nhs: value,
          password: prevValue.password
        }
      } else if (name === "password") {
        return {
          nhs: prevValue.nhs,
          password: value
        }
      }
    })
  }

  function submit(e) {
    e.preventDefault();

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

        <form autoComplete="off" className="form" method="POST" onClick={submit}>
          <Title title={loginInput.title} />
          <Box mb={5}>
            <TextField
              id="outlined-basic"
              label="NHS number"
              variant="outlined"
              type="number"
              className="form-control"
              value={loginDetail.nhs}
              name="nhs"
              required
              onChange={handleInput}
            />
          </Box>
          <Box mb={5}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              className="form-control"
              value={loginDetail.password}
              name="password"
              required
              onChange={handleInput}
            />
          </Box>
          <Container>
            <Button variant="contained" fullWidth="true" color="primary" type="submit" className="btn btn-primary mb-5">
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
