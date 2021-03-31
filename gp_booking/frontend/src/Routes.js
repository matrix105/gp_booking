
import React, { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import { UserContext } from './context/Context'
import About from "./components/About";
import Booking from "./components/Booking";
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute'
import ProtectedLogin from './components/protectedRoutes/ProtectedLogin'

const Routes = () => {
  const { readCookie, isAuth, handleLogin } = useContext(UserContext)
  useEffect(() => {
    console.log(isAuth);
    readCookie()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <ProtectedLogin path='/login' component={Login} />
        <ProtectedRoute path='/booking' component={Booking} />
        <ProtectedRoute path='/about' component={About} />
        <Route path="/" exact><Home /></Route>
      </Switch>
    </BrowserRouter>
  );
};


export default Routes;