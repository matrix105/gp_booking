import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";

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

export default function DataPatients() {
  const [users, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    var tempArray = [];
    setIsLoading(true);
    setError(false);
    try {
      const result = await axios("http://139.59.188.122:1337/users");
      for (let index = 0; index < result.data.length; index++) {
        tempArray.push(result.data[index]);
      }
      setPrescriptions(tempArray);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
    return { users, isLoading, error };
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div style={{ height: '100%', width: "100%" }}>

<div class="about-section">
  <h1>About Us Page</h1>
  <p>Some text about who we are and what we do.</p>
  <p>Resize the browser window to see that this page is responsive by the way.</p>
</div>

<h2>Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <img src="/w3images/team1.jpg" alt="Jane" />
      <div class="container">
        <h2>Deepesh Patel</h2>
        <p class="title">CEO & Founder</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>jane@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="/w3images/team2.jpg" alt="Mike"/>
      <div class="container">
        <h2>Mike Ross</h2>
        <p class="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>mike@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="/w3images/team3.jpg" alt="John"/>
      <div class="container">
        <h2>John Doe</h2>
        <p class="title">Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>john@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
  
</div>

<div class="row">
<div class="column">
    <div class="card">
      <img src="/w3images/team3.jpg" alt="John"/>
      <div class="container">
        <h2>John Doe</h2>
        <p class="title">Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>john@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <img src="/w3images/team3.jpg" alt="John"/>
      <div class="container">
        <h2>John Doe</h2>
        <p class="title">Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>john@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

</div>


    </div>
  );
}
