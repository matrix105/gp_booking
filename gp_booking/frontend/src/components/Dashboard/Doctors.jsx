import * as React from "react";
import axios from "axios";

class Doctors extends React.Component {
  state = {
    bookings: [],
    isLoading: true,
    errors: null,
  };
  componentDidMount() {
    axios
      .get("http://localhost:1337/bookings")
      .then(response =>  this.setState({ bookings: response.data ,isLoading: false  }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, bookings } = this.state;
    return (
      <React.Fragment>
        <h2>Bookings</h2>
        <div>
          {!isLoading ? (
            bookings.map((booking) => {
              return (
                <div key={booking.id}>
                  <p>{booking.patient.fname}</p>
                  <p>{booking.doctor.fname}</p>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Doctors;
