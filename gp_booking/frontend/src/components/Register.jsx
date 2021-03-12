import React, { useState } from "react";
import "./css/login.css";
import Image from "./mini Compnents/Image";
import Title from "./mini Compnents/Title";
import { registerInput } from "./mini Compnents/inputs";
import Messages from "./mini Compnents/Messages";
import { Container, makeStyles, Snackbar, Checkbox } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

function getImage(props) {

  return <Image className="img" src={props.src} alt={props.alt} />;
}
function getMessage(message) {
  return <Messages message={message} />;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  snackBar: {
    width: '100%'
  }
})

const Register = () => {
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

  const [open, setOpen] = React.useState(false);

  const [message, setmessage] = useState('')
  const [snackColour, setsnackColour] = useState('')
  // check box
  const [checked, setChecked] = React.useState(false);

  const [username, setusername] = useState('NHS Number')
  //const [login, setlogin] = useState(initialState)

  // set path
  const [path, setpath] = useState('patients')
  // set username type
  const [usernameType, setusernameType] = useState('')

  const handleInput = (e) => {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
  };

  const handleForm = (e) => {
    e.preventDefault();

    axios.post('http://localhost:1337/auth/local/register', {
      username: input.nhs_num,
      email: input.email,
      password: input.password,
      //checkedA: true,
    })
      .then((response) => {
        axios.post(`http://localhost:1337/${path}`, {

          data: {
            fname: input.firstname,
            lname: input.lastname,
            dob: input.dob,
            phone: input.phone,
            address: input.address,
          },
          headers: {
            Authorization: `Bearer ${response.data.jwt}`
          },

        })
          .then(response => {
            console.log(response.data);
            setmessage('Successfully registered!')
            setsnackColour('success')
            handleClick()
          }).catch(err => {
            console.log(err.response.data);
            setmessage('Something went wrong')
            setsnackColour('warning')
            handleClick()
          })
      })
      .catch(error => {
        console.log(error.response.data);
        setmessage('Something went wrong')
        setsnackColour('warning')
        handleClick()
      })
  }

  const handleClick = (message) => {
    setOpen(true);
    return message
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // handle checkbox
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked === false) {
      setusername('Username')
      setpath('doctors')
      setusernameType('text')
      console.log(path);
    } else {
      setusername('NHS number')
      setpath('patients')
      setusernameType('number')
      console.log(path);
    }

  };

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
          onSubmit={(e) => handleForm(e)}
        >
          <Checkbox
            checked={checked}
            onChange={handleChange}
            label="Are you a doctor"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <span>Are you a doctor?</span>
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
        <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose} style={useStyles.snackBar}>
          <Alert onClose={handleClose} severity={snackColour}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );

}

const styles = {

}


export default Register;
