import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";
import Steppers from './mini Compnents/Stepper'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../context/Context'

function Booking(props) {

  const { handleLogout } = useContext(UserContext)

  return (
    <center>
      <Container>
        <Jumbotron></Jumbotron>
        <Steppers />
        <button onClick={handleLogout}>Log Out</button>
      </Container>
    </center>
  )
}
export default withRouter(Booking)
