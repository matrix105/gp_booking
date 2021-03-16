import * as React from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";
import Steppers from './mini Compnents/Stepper'
import { withRouter } from 'react-router-dom'

function Booking(props) {
  return (
    <center>
      <Container>
        <Jumbotron></Jumbotron>
        <Steppers />
        <button onClick={props.handleLogout}>Log Out</button>
      </Container>
    </center>
  )
}
export default withRouter(Booking)
