
import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import About from "./components/About";
import Booking from "./components/Booking";
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";
import { UserContext } from './context/Context'
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute'
const Routes = () => {
  const { isAuth, readCookie } = useContext(UserContext)



  return (
    <BrowserRouter>
      <Switch>

        {/* <Route exact path='/login' render={props => <Login
          {...props}
        // isAuth={isAuth.toString()}
        // handleLogin={handleLogin}
        />} /> */}
        <Route exact path='/login' component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
        {/* <Route path="/booking" component={Booking} /> */}
        {/* <Route path="/" component={Home} /> */}
        <ProtectedRoute path='/booking' component={Booking} isAuth={isAuth} />
        <ProtectedRoute path='/' component={Home} isAuth={isAuth} />
      </Switch>
    </BrowserRouter>


  );
};


export default Routes;