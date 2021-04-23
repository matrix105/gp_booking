import React, { useContext } from "react";
import { Container, Paper, Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MediaCard from "./mini Compnents/MediaCard";
import { UserContext } from "../context/Context";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "40vh",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  a: {
    textDecoration: "none",
  },
}));

const cards = [
  {
    key: 1,
    url: "/booking",
    title: "Book Appointment",
    description: "Book Appointment with your doctor",
    pic:
      "http://mcr.health/wp-content/uploads/2019/07/If-You-Cant-Get-a-Doctors-Appointment.jpg",
  },
  {
    key: 2,
    url: "/contact",
    title: "Contact the GP",
    description: "You can find our contact form",
    pic: "http://ipage.com/blog/wp-content/uploads/contact-us.png",
  },
  {
    key: 3,
    url: "/https://www.nhs.uk/conditions/coronavirus-covid-19/",
    title: "Covid-19 Support",
    description: "",
    pic: "data:image/png;base64,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",
  },
  {
    key: 4,
    url: "/prescription",
    title: "Request Prescription",
    description: "",
    pic: "https://www.clickclinic.com.au/x/cdn/?https://storage.googleapis.com/production-websitebuilder-v1-0-7/357/164357/ZgRtJ5KR/7d4d00ce9289475e83b252268a73b058",
  },
];

function Home(props) {
  if (window.innerHeight < 1024) console.log(window.innerHeight);
  const classes = useStyles();
  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Matrix GP Clinic
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Our Application for managing GPs and clinics.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" href="/login">
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    href="/prescription"
                  >
                    Request Prescription
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <a href={card.url}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.pic}
                      title={card.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography gutterBottom variant="p" paragraph>
                        {card.description}
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </a>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

const styles = {
  card: {},
};

export default withRouter(Home);
