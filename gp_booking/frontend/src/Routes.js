
import React, { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import About from "./components/About";
import Booking from "./components/Booking";
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute'
import ProtectedLogin from './components/protectedRoutes/ProtectedLogin'
import Appointments from './components/Appointments'
import Edit from './components/Edit'
import Test from './components/test'
import Prescription from './components/Prescription'
import Dashboard from './components/Dashboard/Dashboard'
import Bookings from './components/Dashboard/Bookings'
import Doctors from './components/Dashboard/Doctors'
import Patients from './components/Dashboard/Patients'



const Routes = () => {

  if (localStorage.getItem('token') != null) {
    console.log('logged in');
  }
  console.log(localStorage.getItem('role'));
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact><Home /></Route>
        <ProtectedLogin path="/register" component={Register} />
        <ProtectedLogin path='/login' component={Login} />
        <ProtectedRoute path='/booking' component={Booking} />
        <ProtectedRoute path='/appointments' component={Appointments} />
        <ProtectedRoute path='/about' component={About} />
        <ProtectedRoute path='/edit' component={Edit} />
        <Route path='/prescription' component={Prescription} />
        <Route path='/test' component={Test} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/dashboard/bookings" component={Bookings} />
        <ProtectedRoute path="/dashboard/doctors" component={Doctors} />
        <ProtectedRoute path="/dashboard/patients" component={Patients} />
      </Switch>
    </BrowserRouter>
  );
};


export default Routes;