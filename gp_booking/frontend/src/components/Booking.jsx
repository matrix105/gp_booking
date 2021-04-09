import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";
import Book from './mini Compnents/Book'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../context/Context'

function Booking(props) {

  return (
    <center>
      <Container>
        <Jumbotron></Jumbotron>
        <Book />
      </Container>
    </center>
  )
}
export default withRouter(Booking)
