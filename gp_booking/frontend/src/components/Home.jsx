import * as React from "react";
import { Container, Paper, Grid } from "@material-ui/core";
import { Jumbotron, Title } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MediaCard from "./mini Compnents/MediaCard";

export default function Home(props) {
  console.log(props.seAuth);
  return (
    <>
      <Jumbotron className="jhome">
        <Card className="fly-content">
          <CardContent>
            <Typography color="initial" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id
              mauris eget nulla eleifend condimentum at a elit.
                <br /> Maecenas eu libero tempor, convallis felis ac, imperdiet
                magna. Vestibulum at nunc in dolor cursus tempus.
                <br /> Proin pharetra augue ex, eget bibendum elit commodo in.
                In id facilisis magna. Etiam ut lobortis nibh.
              </Typography>
          </CardContent>
        </Card>
      </Jumbotron>

      <Container className="buts">
        <h3> Good evening. Enter the practice by selecting a room. </h3>
        <Grid container spacing={2}>
          <Grid item xs={3}><MediaCard title="Reception and Enquiries" link="/about" /></Grid>
          <Grid item xs={3}><MediaCard title="Book an Appointment" link="/booking" /></Grid>
          <Grid item xs={3}><MediaCard title="Covid-19 Support" link="/covid-19" /></Grid>
          <Grid item xs={3}><MediaCard title="Request Prescriptions" link="/prescription" /></Grid>
        </Grid>
      </Container>
    </>
  );

}
