import * as React from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";

export default class Home extends React.Component {
  render() {
    return (
      <Container>
          <Jumbotron > 
            <h1>Home</h1>
          </Jumbotron>
      </Container>
    );
  }
}
