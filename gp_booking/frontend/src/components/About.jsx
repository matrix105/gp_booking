import React, { useState, useContext } from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import { Jumbotron } from "reactstrap";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MediaCard from "./mini Compnents/MediaCard";
import { withRouter } from "react-router-dom";
import "./css/style.css";
import Card from "@material-ui/core/Card";
import SnackBar from "./mini Compnents/SnackBar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const initialState = {
  name: "",
  email: "",
  phone: "",
  msg: "",
};


function About(props) {
  if (window.innerHeight < 1024) console.log(window.innerHeight);

  const [inputs, setinputs] = useState(initialState);
  const [type, setType] = useState('');
  const [messege, setMessege] = useState('');

  
  const handleText = (e) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [snackBar, setSnackBar] = React.useState(false);

  const handleClick = () => {
    setSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://139.59.188.122:1337/contacts", {
        name: inputs.name,
        email: inputs.email,
        msg: inputs.msg,
        phone: inputs.phone,
      })
      .then((res) => {
        console.log(res.data);
        setSnackBar("success", "Prescription request successfull");
        setinputs(initialState);
      })
      .catch((err) => {
        console.log(err);
        setSnackBar("warning", "Please fill all the form");
      });
  };
  return (
    <>
      <section class="section-bg" data-scroll-index="7">
        <div class="overlay pt-100 pb-100">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 d-flex align-items-center">
                <div class="contact-info">
                  <h2 class="contact-title">Have Any Questions?</h2>
                  <p>
                    Please do not use this service for any urgent medical
                    queries as this service is only monitored during practice
                    working hours.
                    <br />
                    <br />
                    Your question will be passed to an appropriate member of
                    staff for a response. We aim to respond to all questions
                    within two working days.
                    <br />
                    <br />
                    If you do have an urgent medical query you should telephone
                    the surgery or contact the out of hours service by calling{" "}
                    <strong>111</strong>. In an emergency please contact{" "}
                    <strong>999</strong>.
                  </p>
                  <ul class="contact-info">
                    <li>
                      <div class="info-left">
                        <i class="fas fa-mobile-alt"></i>
                      </div>
                      <div class="info-right">
                        <h4>+11223344550</h4>
                      </div>
                    </li>
                    <li>
                      <div class="info-left">
                        <i class="fas fa-at"></i>
                      </div>
                      <div class="info-right">
                        <h4>info@example.com</h4>
                      </div>
                    </li>
                    <li>
                      <div class="info-left">
                        <i class="fas fa-map-marker-alt"></i>
                      </div>
                      <div class="info-right">
                        <h4>Vicarage St, Luton LU1 3JU</h4>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center">
                <div class="contact-form">
                  <form
                    id="contact-form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="form-name" value="contactForm" />
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="text"
                            name="name"
                            class="form-control"
                            id="first-name"
                            placeholder="Enter Your Name *"
                            required="required"
                            onChange={handleText}
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="email"
                            name="email"
                            class="form-control"
                            id="email"
                            placeholder="Enter Your Email *"
                            required="required"
                            onChange={handleText}
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="tel"
                            name="phone"
                            class="form-control"
                            id="phone"
                            placeholder="Enter Your Phone Number *"
                            required="required"
                            onChange={handleText}
                          />
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="form-group">
                          <textarea
                            rows="4"
                            name="msg"
                            class="form-control"
                            id="msg"
                            placeholder="Enter Your Message *"
                            required="required"
                            onChange={handleText}
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          onClick={handleClick}
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SnackBar
          type={type}
          message={messege}
        />
      </section>
    </>
  );
}

const styles = {
  card: {},
};

export default withRouter(About);
