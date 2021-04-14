import React, { useState, useContext, useEffect, } from "react";
import "./css/login.css";
import Image from "./mini Compnents/Image";
import Title from "./mini Compnents/Title";
import { registerInput } from "./mini Compnents/inputs";
import Messages from "./mini Compnents/Messages";
import { Container, makeStyles, Snackbar, Checkbox } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { UserContext } from '../context/Context'
import SnackBar from './mini Compnents/SnackBar'
import Webcam from "react-webcam";

function getImage(props) {

  return <Image className="img" src={props.src} alt={props.alt} />;
}
function getMessage(message) {
  return <Messages message={message} />;
}

const useStyles = makeStyles({
  snackBar: {
    width: '100%'
  }
})

const Register = () => {
  const { handleClick, setCookie } = useContext(UserContext)

  let history = useHistory();

  const [input, setInput] = useState({
    nhs_num: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cPassword: "",
    dob: "",
    phone: "",
    address: "",
  })
  // snackBar
  const [message, setmessage] = useState('')
  const [type, settype] = useState('')
  // check box
  const [checked, setChecked] = React.useState(false);

  const [username, setusername] = useState('NHS Number')
  //const [login, setlogin] = useState(initialState)

  // set username type
  const [usernameType, setusernameType] = useState('number')

  const [path, setpath] = useState(checked ?
    "" :
    "patients"
  )

  const handleInput = (e) => {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
  };

  const setSnackBar = (type, message) => {
    settype(type)
    setmessage(message)
    handleClick()
  }

  const createDetail = (jwt, userId, fname, lname, dob, phone, address, path) => {
    console.log(jwt);
    axios.post(`http://localhost:1337/${path}`, {
      headers: {
        Authorization:
          `Bearer ${jwt}`,
      },
      user: userId,
      fname: fname,
      lname: lname,
      dob: dob,
      phone: phone,
      address: address,

    }).then(res => {
      if (localStorage.getItem('token')) {
        setSnackBar('success', 'Registered Sucessfully')
        history.push('/dashboard')
      }
    }).catch(err => {
      console.log(err);
    })
    console.log(path);
  }

  const handleForm = (e) => {
    e.preventDefault()
    axios.post('http://localhost:1337/auth/local/register', {
      username: input.nhs_num,
      email: input.email,
      password: input.password,
      //checkedA: true,
    })
      .then((res) => {
        console.log(res.data);
        axios.post(`http://localhost:1337/auth/local`, {
          identifier: input.email,
          password: input.password
        })
          .then((response) => {
            console.log(response.data);
            const userId = response.data.user.id;
            const jwt = response.data.jwt
            setCookie(jwt)
            localStorage.setItem('username', response.data.user.id)
            localStorage.setItem('identifier', response.data.user.username)
            //localStorage.setItem('role', response.data.user.role.description)
            localStorage.setItem('password', input.password)
            console.log(path);
            createDetail(jwt, userId, input.firstname, input.lastname, input.dob, input.phone, input.address, path)
          })
          .catch(err => {
            console.log(err.message);
            setSnackBar('error', 'Something wrong!')
          })
      })
      .catch(error => {
        console.log(error.message);
        setSnackBar('error', 'Username or password already taken!')
      })
  }

  // handle checkbox
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked === false) {
      setpath('doctors')
      setusername('Username')
      setusernameType('text')

    } else {
      setpath('patients')
      setusername('NHS number')
      setusernameType('number')
    }

  };
  console.log(path);
  return (
    <Container>
      <div className="containers" style={{ margin: "0px", padding: "0px" }}>
        <div className="imageContainer">
          {registerInput.image.map(getImage)}
          <div className="middle">
            <div className="text">
              {registerInput.messages.map(getMessage)}
            </div>
          </div>
        </div>

        <form
          autoComplete="off"
          className="form"
          onSubmit={handleForm}
        >
          <Checkbox
            checked={checked}
            onChange={handleChange}
            label="Are you a doctor"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <span>Are you a Doctor?</span>
          <Title title={registerInput.title} />
          <TextField
            id="nhs"
            label={username}
            variant="outlined"
            type={usernameType}
            className="form-control"
            value={input.nhs_num}
            name="nhs_num"
            required
            onChange={e => handleInput(e)}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            className="form-control"
            //value={data.email}
            value={input.email}
            name="email"
            required
            onChange={e => handleInput(e)}
          />
          <TextField
            id="fname"
            label="Firstname"
            variant="outlined"
            type="text"
            className="form-control"
            // value={data.firstname}
            value={input.firstname}
            name="firstname"
            required
            onChange={e => handleInput(e)}
          />
          <TextField
            id="lname"
            label="Lastname"
            variant="outlined"
            type="text"
            className="form-control"
            //value={data.lastname}
            value={input.lastname}
            name="lastname"
            required
            onChange={e => handleInput(e)}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            className="form-control"
            //value={data.password}
            value={input.password}
            name="password"
            required
            onChange={e => handleInput(e)}
          />

          <TextField
            id="date"
            label="Date Of Birth"
            variant="outlined"
            type="date"
            className="form-control"
            //value={data.dob}
            value={input.dob}
            name="dob"
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => handleInput(e)}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            type="tel"
            className="form-control"
            //value={data.phone}
            value={input.phone}
            name="phone"
            required
            onChange={e => handleInput(e)}
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            type="text"
            className="form-control"
            //value={data.address}
            value={input.address}
            name="address"
            onChange={e => handleInput(e)}
          />


          <Button variant="contained" color="primary" type="submit" className="btn btn-primary mt-5">
            Submit
            </Button>
        </form>
        <SnackBar
          type={type}
          message={message}
        />
      </div>
    </Container>
  );

}


export default Register;
