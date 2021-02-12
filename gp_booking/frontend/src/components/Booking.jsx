import * as React from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";
import Steppers from './mini Compnents/Stepper'


export default class Booking extends React.Component {
  render() {
    return (
      <Container>
        <Jumbotron></Jumbotron>
        <Steppers />
      </Container>
    );
  }
}
