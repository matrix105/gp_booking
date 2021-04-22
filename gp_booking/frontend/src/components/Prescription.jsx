import React, { useContext, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import RequestPrescriptionForm from './mini Compnents/RequestPrescriptionForm'
import { UserContext } from "../context/Context";
import SnackBar from "./mini Compnents/SnackBar";
import { Typography } from '@material-ui/core'
import PrescriptionHistory from "./mini Compnents/PrescriptionHistory";

class Prescription extends React.Component {
  state = {
    prescriptions: [],
    isLoading: true,
    errors: null,
    type: '',
    message: ''
  };

  static contextType = UserContext

  componentDidMount() {

    if (localStorage.getItem('token') === null) {
      axios
        .get("http://139.59.188.122:1337/prescriptions")
        .then((response) =>
          //this.setState({ prescriptions: response.data, isLoading: false })
          console.log(response.data)
        )
        .catch((error) => this.setState({ error, isLoading: false }));
    } else {
      axios.get(`http://139.59.188.122:1337/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(res => {
          axios
            .get(`http://139.59.188.122:1337/prescriptions/?email=${res.data.email}`)
            .then((response) =>
              this.setState({ prescriptions: response.data, isLoading: false })
            )
            .catch((error) => this.setState({ error, isLoading: false }));
        }).catch(e => {
          console.log(e);
        })

    }
  }

  render() {
    const { isLoading, prescriptions } = this.state;

    const headings = ["Medicine", "Strength", "Quantity", "Date of request", "Status", ""]

    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "firstName", headerName: "First name", width: 130 },
      { field: "lastName", headerName: "Last name", width: 130 },
      { field: "email", headerName: "Email", width: 130 },
      {
        field: "medication",
        headerName: "Medication",
        width: 200,
      },
    ];

    const { handleClick } = this.context
    const setSnackBar = (type, message) => {
      this.setState({
        type: type,
        message: message
      })
      handleClick()
    }


    return (
      <React.Fragment>
        <Typography
          component="h1"
          variant="h3"
          color="primary"
          gutterBottom
          align="center"
        >
          Request Prescription
        </Typography>
        <RequestPrescriptionForm
          setSnackBar={setSnackBar}
        />
        <SnackBar
          type={this.state.type}
          message={this.state.message}
        />
        {localStorage.getItem('token') != null ?
          <>
            <h3 style={{ marginLeft: "80px" }}>Prescription History</h3>
            <PrescriptionHistory
              titles={headings}
              datas={prescriptions}
            />
          </>
          : null
        }

      </React.Fragment>
    );
  }
}

export default Prescription;
