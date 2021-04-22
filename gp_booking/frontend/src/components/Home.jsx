import React, { useContext } from "react";
import { Container, Paper, Grid } from "@material-ui/core";
import { Jumbotron, Title } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MediaCard from "./mini Compnents/MediaCard";
import { UserContext } from '../context/Context'
import { withRouter } from 'react-router-dom'

function Home(props) {
  if (window.innerHeight < 1024)
    console.log(window.innerHeight);
  return (
    <>
      <Jumbotron className="jhome">
      </Jumbotron>

      <Container className="buts">
        <h3> Good evening. Enter the practice by selecting a room. </h3>
        <Grid container spacing={2}>
          <Grid item xs={3}><MediaCard title="Reception and Enquiries" link="/about" /></Grid>
          <Grid item xs={3}><MediaCard title="Book an Appointment" link="/booking" /></Grid>
          <Grid item xs={3}><MediaCard title="Covid-19 Support" link="https://www.nhs.uk/conditions/coronavirus-covid-19/" /></Grid>
          <Grid item xs={3}><MediaCard title="Request Prescriptions" link="/prescription" /></Grid>
        </Grid>
      </Container>
    </>
  );

}

const styles = {
  card: {

  }
}

export default withRouter(Home)