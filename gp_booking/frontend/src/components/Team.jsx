import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Jumbotron } from "reactstrap";


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
              alt="Deepesh"
            />
            <div class="container">
              <h2>Deepesh Patel</h2>
              <p class="title">Project Manager</p>
              <p>1812328</p>
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
              <p>1818664</p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img
              src="http://139.59.188.122:1337/uploads/phonepicutres_TA_56a1a705f2.jpg"
              alt="Jubeen"
            />
            <div class="container">
              <h2>Jubeen Amatya</h2>
              <p class="title">Risk Controller</p>
              <p>1818357</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <div class="card">
            <img
              src="http://139.59.188.122:1337/uploads/phonepicutres_TA_56a1a705f2.jpg"
              alt="Umar"
            />
            <div class="container">
              <h2>Umar Sanusi</h2>
              <p class="title">Quality Assurer</p>
              <p>1811726</p>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <img
              src="http://139.59.188.122:1337/uploads/phonepicutres_TA_56a1a705f2.jpg"
              alt="Marwan"
            />
            <div class="container">
              <h2>Marwan Tourky</h2>
              <p class="title">Development Manager</p>
              <p>1816281</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
