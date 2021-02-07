import * as React from "react";
import { Container } from '@material-ui/core';
import Form from './Form';


export default class Login extends React.Component {
  render() {
    return (
      <Container>
        <Form
          url={this.props.match.params.id}
        />
      </Container>
    );
  }
}
