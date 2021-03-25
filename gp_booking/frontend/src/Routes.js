
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import About from "./components/About";
import Booking from "./components/Booking";
import Home from './components/Home';
import Login from './components/Login';
import Register from "./components/Register";
import { UserContext } from './context/Context'
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute'
import ProtectedLogin from './components/protectedRoutes/ProtectedLogin'
import ProtectedBooking from './components/protectedRoutes/ProtectedBooking'
const Routes = () => {
  const { isAuth, setisAuth } = useContext(UserContext)

  const readCookie = () => {
    const token = localStorage.getItem("token")
    //const token = cookies.get('token')
    if (token) {
      setisAuth(true);
    } else {
      setisAuth(false);
    }
  }

  useEffect(() => {
    readCookie()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path='/login' component={Login} /> */}
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
        <ProtectedLogin path='/login' component={Login} />
        <ProtectedBooking path='/booking' component={Booking} />
        <ProtectedRoute path='/' component={Home} />
      </Switch>
    </BrowserRouter>


  );
};


export default Routes;