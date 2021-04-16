import React, { useContext, useState } from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";
import Book from './mini Compnents/Book'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../context/Context'
import SnackBar from './mini Compnents/SnackBar'

function Booking(props) {
  const { handleClick } = useContext(UserContext)
  const [snackBar, setsnackBar] = useState({
    type: '',
    message: ''
  })
  console.log(localStorage.getItem('role'));
  const setSnackBar = (type, message) => {
    setsnackBar({
      type: type, message: message
    })
    handleClick()
  }
  return (
    <center>
      <Container>
        <Jumbotron></Jumbotron>
        {localStorage.getItem('role') === "4" ?
          <Book
            setSnackBar={setSnackBar}
          />
          :
          <>
            <h1>Please wait...</h1>
            {
              setSnackBar('warning', 'Not verified yet, cannot book')
            }
          </>
        }
        <SnackBar
          type={snackBar.type}
          message={snackBar.message}
        />
      </Container>
    </center>
  )
}
export default withRouter(Booking)
