import React, { useContext, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import RequestPrescriptionForm from './mini Compnents/RequestPrescriptionForm'
import { UserContext } from "../context/Context";
import SnackBar from "./mini Compnents/SnackBar";
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

  // setSnackBar = (type, message) => {
  //   setsnackbar({
  //     type: type, message: message
  //   })
  // }


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

    const headings = ["Medicine", "Strength", "Quantity", "Date of request", "Status"]

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

    // const rows = [
    //   { id: 1, lastName: "Snow", firstName: "Jon", email: 35 },
    //   { id: 2, lastName: "Lannister", firstName: "Cersei", email: 42 },
    //   { id: 3, lastName: "Lannister", firstName: "Jaime", email: 45 },
    //   { id: 4, lastName: "Stark", firstName: "Arya", email: 16 },
    //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", email: null },
    //   { id: 6, lastName: "Melisandre", firstName: null, email: 150 },
    //   { id: 7, lastName: "Clifford", firstName: "Ferrara", email: 44 },
    //   { id: 8, lastName: "Frances", firstName: "Rossini", email: 36 },
    //   { id: 9, lastName: "Roxie", firstName: "Harvey", email: 65 },
    // ];

    return (
      <React.Fragment>
        {/* <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div> */}
        <RequestPrescriptionForm
          setSnackBar={setSnackBar}
        />
        <SnackBar
          type={this.state.type}
          message={this.state.message}
        />
        {/* <h2>Prescriptions</h2>
        <ul>
          {!isLoading ? (
            prescriptions.map((prescription) => {
              return (
                <li key={prescription.id}>
                  <p>
                    {prescription.fname} {prescription.lname}
                  </p>
                  <p>
                    <ul>
                      {prescription.medication.map((med) => {
                        return (
                          <li key={med.id}>
                            {console.log(med)}
                            name: {med.name} - strenght: {med.strength} -
                            quantity: {med.quantity}
                          </li>
                        );
                      })}
                    </ul>
                  </p>
                  <hr />
                </li>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </ul> */}

        <PrescriptionHistory
          titles={headings}
          datas={prescriptions}
        />

      </React.Fragment>
    );
  }
}

export default Prescription;
