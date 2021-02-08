import * as React from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";


export default class About extends React.Component {
  render() {
    return (
      <Container>
          <Jumbotron > 
            <h1>About</h1>
          </Jumbotron>
      </Container>
    );
  }
}
