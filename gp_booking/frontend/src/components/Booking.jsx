import * as React from "react";
import { Container } from "@material-ui/core";
import { Jumbotron } from "reactstrap";
import Tables from './mini Compnents/Table'
import { func } from "prop-types";

var titles, doctors = []
function makeTitles() {
  return (
    titles = ["", "Id", "Name", "Rank"]
  )
}

function makeBody() {
  return (
    doctors = [
      { picture: "", id: "1", name: "Jubeen Amatya", rank: "Surgeon" },
      { picture: "", id: "2", name: "Jubeen Amatya", rank: "Dentist" }
    ]
  )
}

function makeColumn() {

}

export default class Booking extends React.Component {
  render() {
    return (
      <Container>
        <Jumbotron >
          <Tables
            titles={makeTitles()}
            body={makeBody()}
          />
        </Jumbotron>
      </Container>
    )
  }
}
