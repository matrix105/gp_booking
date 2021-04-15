import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";
import Book from './mini Compnents/Book'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../context/Context'
import SnackBar from './mini Compnents/SnackBar'

function Booking(props) {
  const { handleClick } = useContext(UserContext)
  console.log(localStorage.getItem('role'));
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
