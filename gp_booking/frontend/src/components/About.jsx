import React, { useContext } from "react";
import { Jumbotron } from "reactstrap";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MediaCard from "./mini Compnents/MediaCard";
import { withRouter } from "react-router-dom";
import "./css/style.css";
import Card from "@material-ui/core/Card";

function About(props) {
  if (window.innerHeight < 1024) console.log(window.innerHeight);
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
                    the surgery or contact the out of hours service by calling <strong>111</strong>
                    . In an emergency please contact <strong>999</strong>.
                    
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
                  <form id="contact-form" method="POST">
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
                          />
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="form-group">
                          <textarea
                            rows="4"
                            name="message"
                            class="form-control"
                            id="description"
                            placeholder="Enter Your Message *"
                            required="required"
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <button class="btn-big btn btn-bg">
                          Send Us <i class="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const styles = {
  card: {},
};

export default withRouter(About);
