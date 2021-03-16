
import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import About from "./components/About";
import Booking from "./components/Booking";
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute'
const Routes = () => {
  const [isAuth, setisAuth] = useState(false)
  console.log(isAuth);
  const handleLogin = e => {
    e.preventDefault();
    setisAuth(true);
  }
  const handleLogout = e => {
    e.preventDefault();
    setisAuth(false);
  }
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path='/login' handleLogin={handleLogin} render={props => <Login
          {...props}
          isAuth={isAuth.toString()}
          handleLogin={handleLogin}
        />} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
        <ProtectedRoute exact path='/booking' isAuth={isAuth} component={Booking} />
        <ProtectedRoute exact path='/' component={Home} handleLogout={handleLogout} />
      </Switch>
    </BrowserRouter>


  );
};


export default Routes;