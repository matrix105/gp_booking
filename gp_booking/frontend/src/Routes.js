
import React, { useReducer, useState, useContext } from "react";
import { SetContext } from './context/Context'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Booking from "./components/Booking";
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";

const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/booking" component={Booking} />
      </Switch>
    </BrowserRouter>

  );
};

export default Routes;