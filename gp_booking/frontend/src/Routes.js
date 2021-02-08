import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>

  );
};

export default Routes;