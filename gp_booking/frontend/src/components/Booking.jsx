import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";
import Steppers from './mini Compnents/Stepper'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../context/Context'

function Booking(props) {

  return (
    <center>
      <Container>
        <Jumbotron></Jumbotron>
        <Steppers />
      </Container>
    </center>
  )
}
export default withRouter(Booking)
