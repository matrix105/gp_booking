import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Jumbotron } from "reactstrap";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fname", headerName: "First name", width: 160 },
  { field: "lname", headerName: "Last name", width: 160 },
  { field: "email", headerName: "email", width: 250 },
  {
    field: "dob",
    headerName: "Date of Birth",
    type: "string",
    width: 160,
  },
  { field: "role", headerName: "Role", width: 250 },
];

export default function Team() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Jumbotron class="about-section">
        <center>
          <h1>Meet The Team</h1>
          <p>Group 24 - CIS015-3</p>
        </center>
      </Jumbotron>
      <div class="row">
        <div class="column">
          <div class="card">
            <img
              src="http://139.59.188.122:1337/uploads/phonepicutres_TA_56a1a705f2.jpg"
              alt="John"
            />
            <div class="container">
              <h2>Deepesh Patel</h2>
              <p class="title">Project Manager</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>18181818</p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img
              src="http://139.59.188.122:1337/uploads/phonepicutres_TA_56a1a705f2.jpg"
              alt="John"
            />
            <div class="container">
              <h2>Kathan Sheth</h2>
              <p class="title">Team Manager</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img
              src="http://139.59.188.122:1337/uploads/phonepicutres_TA_56a1a705f2.jpg"
              alt="John"
            />
            <div class="container">
              <h2>Jubeen Amatya</h2>
              <p class="title">Risk Controller</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <div class="card">
            <img
              src="http://139.59.188.122:1337/uploads/phonepicutres_TA_56a1a705f2.jpg"
              alt="John"
            />
            <div class="container">
              <h2>Umar Sanusi</h2>
              <p class="title">Quality Assurer</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>john@example.com</p>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <img
              src="http://139.59.188.122:1337/uploads/phonepicutres_TA_56a1a705f2.jpg"
              alt="John"
            />
            <div class="container">
              <h2>Marwan Tourky</h2>
              <p class="title">Development Manager</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>1816281</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
