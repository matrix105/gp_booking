import React from "react";
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



class Register extends React.Component {
  state = {
    details: [],
    nhs_num: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
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
      .catch((err) => {});
  };

  render() {
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
            onSubmit={this.handleSubmit}
          >
            <Title title={registerInput.title} />
            <TextField
              id="outlined-basic"
              label="NHS Number"
              variant="outlined"
              type="number"
              className="form-control"
              value={this.state.nhs_num}
              name="nhs_num"
              required
              onChange={this.handleInput}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              className="form-control"
              value={this.state.email}
              name="email"
              required
              onChange={this.handleInput}
            />
            <TextField
              id="outlined-basic"
              label="Firstname"
              variant="outlined"
              type="text"
              className="form-control"
              value={this.state.firstname}
              name="firstname"
              required
              onChange={this.handleInput}
            />
            <TextField
              id="outlined-basic"
              label="Lastname"
              variant="outlined"
              type="text"
              className="form-control"
              value={this.state.lastname}
              name="lastname"
              required
              onChange={this.handleInput}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              className="form-control"
              value={this.state.password}
              name="password"
              required
              onChange={this.handleInput}
            />
            <TextField
              id="date"
              label="Date Of Birth"
              variant="outlined"
              type="date"
              className="form-control"
              value={this.state.dob}
              name="dob"
              required
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleInput}
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              type="tel"
              className="form-control"
              value={this.state.phone}
              name="phone"
              required
              onChange={this.handleInput}
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              type="tel"
              className="form-control"
              value={this.state.address}
              name="address"
              onChange={this.handleInput}
            />
            <TextField
              id="outlined-basic"
              label="Notes"
              variant="outlined"
              type="text"
              className="form-control"
              placeholder="Notes"
              value={this.state.notes}
              name="notes"
              onChange={this.handleInput}
            />
            <Button variant="contained" color="primary" type="submit" className="btn btn-primary mb-5">
              Submit
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default Register;
