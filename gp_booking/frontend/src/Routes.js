
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
import Resetpassword from './components/Resetpassword'
import CreatenewPassword from "./components/CreatenewPassword";

const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path='/prescription' component={Prescription} />
        <Route path='/test' component={Test} />
        <Route path='/forgotPassword' component={Resetpassword} />
        <Route path='/resetPassword' component={CreatenewPassword} />
        <ProtectedLogin path="/register" component={Register} />
        <ProtectedLogin path='/login' component={Login} />
        {localStorage.getItem('role') === "3" ? <ProtectedRoute path='/booking' component={Booking} /> : <ProtectedRoute path="/dashboard" component={Dashboard} />}
        <ProtectedRoute path='/booking' component={Booking} />
        <ProtectedRoute path='/appointments' component={Appointments} />
        <ProtectedRoute path='/about' component={About} />
        <ProtectedRoute path='/edit' component={Edit} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/dashboard/bookings" component={Bookings} />
        <ProtectedRoute path="/dashboard/doctors" component={Doctors} />
        <ProtectedRoute path="/dashboard/patients" component={Patients} />
      </Switch>
    </BrowserRouter>
  );
};


export default Routes;