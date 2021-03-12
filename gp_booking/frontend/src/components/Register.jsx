import React, { useReducer, useState } from "react";
import "./css/login.css";
import Context from '../context/Context'
import Image from "./mini Compnents/Image";
import Title from "./mini Compnents/Title";
import { registerInput } from "./mini Compnents/inputs";
import Messages from "./mini Compnents/Messages";
import { Container, makeStyles, IconButton, Snackbar, FormControlLabel, Switch } from "@material-ui/core";
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

var handleClick, handleClose, makeSnackbar

const initialState = {
  nhs_num: "",
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  cPassword: "",
  dob: "",
  phone: "",
  address: "",
  setOpen: false,
  checkedB: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'handle_input':
      return {
        ...state,
        [action.field]: action.payload
      }


    case 'handle_form':
      console.log(state.username);
      axios.post('http://localhost:1337/auth/local/register', {

        username: state.username,
        email: state.email,
        password: state.password,

        firstName: state.firstname,
        lastName: state.lastname,
        dob: state.dob,
        phone: state.phone,
        address: state.address,
        nhs_num: state.nhs_num,
      })
        .then((response) => {

          /* return {
            U
          } */
        })
        .catch(error => {
          handleClick()
          if (error.response) {
            const errorMessage = error.response.data.data[0].messages[0].message
            return (
              alert(errorMessage)
              // <div>
              //   <Snackbar
              //     anchorOrigin={{
              //       vertical: 'bottom',
              //       horizontal: 'left',
              //     }}
              //     open={state.setOpen}
              //     autoHideDuration={6000}
              //     onClose={handleClose}
              //     message="Note archived"
              //     action={
              //       <React.Fragment>
              //         <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              //           <CloseIcon fontSize="small" />
              //         </IconButton>
              //       </React.Fragment>
              //     }
              //   />
              // </div>
            )
          }
        })

    case 'handle_click_snack':
      return ({
        ...state,
        setOpen: true
      })
    case 'handle_snack_close':
      return ({
        ...state,
        setOpen: false
      })
    case 'toggle':
      return {
        ...state,
        [action.field]: action.payload
      }
    default:
      {
        return state
      }
  }
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
    username: "",
    password: "",
    cPassword: "",
    dob: "",
    phone: "",
    address: "",
  })

  const [open, setOpen] = React.useState(false);

  const [login, setlogin] = useState(initialState)


  const [data, dispatch] = useReducer(reducer, initialState)

  const handleInput = (e) => {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
    /* dispatch({
      type: 'handle_input',
      field: e.target.name,
      payload: e.target.value
    }) */
  };

  const handleForm = (e) => {
    e.preventDefault();
    /*  dispatch({
       type: 'handle_form',
     }) */
    axios.post('http://localhost:1337/auth/local/register', {

      username: input.username,
      email: input.email,
      password: input.password,
      firstName: input.firstname,
      lastName: input.lastname,
      dob: input.dob,
      phone: input.phone,
      address: input.address,
      nhs_num: input.nhs_num,
    })
      .then((response) => {
        console.log('user registered');
      })
      .catch(error => {
        console.log(error.response);
        handleClick()
      })
  }

  handleClick = () => {
    /* dispatch({
      type: 'handle_click_snack'
    }) */
    setOpen(true);
  };

  handleClose = (event, reason) => {
    // dispatch({
    //   type: 'handle_snack_close'
    // })
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleToggleChange = e => {
    dispatch({
      type: 'toggle',
      field: e.target.name,
      payload: e.target.checked
    })
  }

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

          <FormControlLabel
            control={
              <Switch
                checked={initialState.checkedB}
                onChange={handleToggleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Are you a doctor"
          />

          <Title title={registerInput.title} />
          <TextField
            id="outlined-basic"
            label="NHS Number"
            variant="outlined"
            type="number"
            className="form-control"
            value={data.nhs_num}
            value={input.nhs_num}
            name="nhs_num"
            required
            onChange={e => handleInput(e)}
          />
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            className="form-control"
            //value={data.username}
            value={input.username}
            name="username"
            required
            onChange={e => handleInput(e)}
          />
          <TextField
            id="outlined-basic"
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
            id="outlined-basic"
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
            id="outlined-basic"
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
            id="outlined-basic"
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
            id="outlined-basic"
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
            id="outlined-basic"
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
          <Alert onClose={handleClose} severity="error">
            This is a success message!
        </Alert>
        </Snackbar>
      </div>
    </Container>
  );

}

const styles = {

}


export default Register;
