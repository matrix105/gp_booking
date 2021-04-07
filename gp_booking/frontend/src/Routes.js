
import React, { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import About from "./components/About";
import Booking from "./components/Booking";
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute'
import ProtectedLogin from './components/protectedRoutes/ProtectedLogin'
import { UserContext } from './context/Context'

const Routes = () => {
  const { readCookie, isAuth, handleLogin } = useContext(UserContext)
  useEffect(() => {
    console.log(isAuth);
    console.log('hello');
    readCookie()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/register" component={Register} />
        <ProtectedLogin path='/login' component={Login} />
        <ProtectedRoute path='/booking' component={Booking} />
        <ProtectedRoute path='/about' component={About} />
      </Switch>
    </BrowserRouter>
  );
};


export default Routes;