import React, { useReducer } from "react";
import "./css/login.css";
import Image from "./mini Compnents/Image";
import Title from "./mini Compnents/Title";
import { registerInput } from "./mini Compnents/inputs";
import Messages from "./mini Compnents/Messages";
import { Container } from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

function getImage(props) {


  return <Image className="img" src={props.src} alt={props.alt} />;
}
function getMessage(message) {
  return <Messages message={message} />;
}


const initialState = {
  nhs_num: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  cPassword: "",
  dob: "",
  phone: "",
  address: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'handle_input':
      return {
        ...state,
        [action.field]: action.payload
      }


    case 'handle_form':
      return {
        // fetch API

        // store in database
      }
    default:
      {
        return state
      }
  }
}

const Register = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleInput = (e) => {
    dispatch({
      type: 'handle_input',
      field: e.target.name,
      payload: e.target.value
    })
  };

  const handleForm = (e) => {
    dispatch({
      type: 'handle_form'
    })
  }

  /* handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/')

    axios
      .post("http://localhost:1337/", {
        nhs_num: this.state.nhs_num,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        dob: this.state.dob,
        phone: this.state.phone,
      })
      .then((res) => {
        this.setState({
          nhs_num: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          dob: "",
          phone: "",
        });
      })
      .catch((err) => { });
  }; */


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
          <Title title={registerInput.title} />
          <TextField
            id="outlined-basic"
            label="NHS Number"
            variant="outlined"
            type="number"
            className="form-control"
            value={state.nhs_num}
            name="nhs_num"
            required
            onChange={e => handleInput(e)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            className="form-control"
            value={state.email}
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
            value={state.firstname}
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
            value={state.lastname}
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
            value={state.password}
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
            value={state.dob}
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
            value={state.phone}
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
            value={state.address}
            name="address"
            onChange={e => handleInput(e)}
          />

          <Button variant="contained" color="primary" type="submit" className="btn btn-primary mt-5">
            Submit
            </Button>
        </form>
      </div>
    </Container>
  );

}

const styles = {

}


export default Register;
