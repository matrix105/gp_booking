import { React, useState } from "react";
import "./css/login.css";
import Image from "./mini Compnents/Image";
import Title from "./mini Compnents/Title";
import { loginInput } from "./mini Compnents/inputs";
import Messages from "./mini Compnents/Messages";
import { useHistory, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Box, Button, TextField, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
//import Auth from './protectedRoutes/Auth'
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {
  let history = useHistory();
  const [input, setinput] = useState({
    username: '',
    password: '',
  })
  // snackBar
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState('')
  const [snackColour, setsnackColour] = useState('')


  const handleTextChange = (e) => {
    setinput({
      ...input, [e.target.name]: e.target.value
    })
  }

  const handleForm = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1337/auth/local', {
      identifier: input.username,
      password: input.password
    })
      .then(response => {
        console.log(response.data.user);
        setmessage('Successfully registered!')
        setsnackColour('success')
        handleClick()
        history.push('/')
      })
      .catch(err => {
        setmessage('Invalid nhs number or password')
        setsnackColour('warning')
        handleClick()
        console.log(err.response);
        // console.log(err.message[0].messages[0].message);
      })
  }

  const redirectRegister = (e) => {
    history.push('/register')
  }

  // Snackbar handlers
  const handleClick = () => {
    setOpen(true);
    return message
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


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
            <Button onClick={e => redirectRegister(e)} variant="contained" fullWidth="true" color="secondary" type="button" className="btn btn-primary mb-5">
              Sign up
            </Button>
          </Container>

        </form>
        <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snackColour}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}

export default Login;
