import { React, useState, useContext } from "react";
import { UserContext } from '../context/Context'
import "./css/login.css";
import Image from "./mini Compnents/Image";
import Title from "./mini Compnents/Title";
import { loginInput } from "./mini Compnents/inputs";
import Messages from "./mini Compnents/Messages";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Box, Button, TextField } from '@material-ui/core';
import SnackBar from './mini Compnents/SnackBar'
import axios from "axios";
import { Link } from 'react-router-dom'

function Login() {
  const { setCookie, setUserInformation, handleClick, setpath } = useContext(UserContext)
  const [type, setType] = useState("")
  const [message, setmessage] = useState("")
  let history = useHistory();
  const [input, setinput] = useState({
    username: '',
    password: '',
  })


  const handleTextChange = (e) => {
    setinput({
      ...input, [e.target.name]: e.target.value
    })
  }

  const handleForm = (e) => {
    e.preventDefault();
    axios.post('http://139.59.188.122:1337/auth/local', {
      identifier: input.username,
      password: input.password
    })
      .then(response => {
        console.log();
        if (response.data.user.confirmed === true) {
          const jwt = response.data.jwt
          const id = response.data.user.id
          const role = response.data.user.role.id
          setCookie(jwt, id, role)
          if (localStorage.getItem('role') === "4") {
            history.push('/')
          } else {
            history.push('/dashboard')
          }
        } else {
          setType('warning')
          setmessage('You have not been confirmed. Please wait till you get confirmed')
          handleClick()
        }
      })
      .catch(err => {
        setType('error')
        setmessage('Invalid email or password')
        handleClick()
        console.log(err.message);
      })
  }


  function getImage(props) {
    return <Image className="img" src={props.src} alt={props.alt} />;
  }
  function getMessage(message) {
    return <Messages message={message} />;
  }
  return (
    <Container key='loginContainer'>
      <div className="containers" style={{ margin: "0px", padding: "0px" }}>
        <div className="imageContainer">
          {loginInput.image.map(getImage)}
          <div className="middle">
            <div className="text">{loginInput.messages.map(getMessage)}</div>
          </div>
        </div>

        <form autoComplete="off" className="form" onSubmit={handleForm}>
          <Title title={loginInput.title} />
          <Box mb={5}>
            <TextField
              id="outlined-basic"
              label="Email or Nhs number if you are logging as a patient"
              variant="outlined"
              type="text"
              className="form-control"
              value={input.username}
              name="username"
              required
              onChange={handleTextChange}
            />
          </Box>
          <Box mb={5}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              className="form-control"
              value={input.password}
              name="password"
              required
              onChange={handleTextChange}
            />
          </Box>
          <Container>
            <Button type="submit" variant="contained" fullWidth="true" color="primary" className="btn btn-primary mb-5">
              Login
            </Button>
            <Button onClick={() => history.push('/register')} variant="contained" fullWidth="true" color="secondary" type="button" className="btn btn-primary mb-5">
              Sign up
            </Button>
            <SnackBar
              type={type}
              message={message}
            />
          </Container>
          <Link to='forgotPassword'>Forgot your password?</Link>
        </form>
      </div>
    </Container>
  );
}

export default Login;
