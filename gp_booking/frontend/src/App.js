
import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Routes from "./Routes";
import "./components/css/style.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"
import { UserContext } from './context/Context'
import Cookies from 'universal-cookie'

function App() {
  const [jwt, setjwt] = useState(
    localStorage.getItem('token') || ''
  )
  const [userInformation, setUserInformation] = useState(null)
  const [bookingList, setbookingList] = useState([])
  const [isAuth, setisAuth] = useState(false)
  const cookies = new Cookies()


  const handleLogin = e => {
    e.preventDefault();
    setisAuth(true);
  }
  const handleLogout = e => {
    e.preventDefault();
    localStorage.clear()
    setisAuth(false);
  }

  const setCookie = (jwt) => {
    //cookies.set('token', jwt)
    localStorage.setItem('token', jwt);
  }


  return (

    <UserContext.Provider value={{
      jwt, setjwt, handleLogin, handleLogout, isAuth, setisAuth, setUserInformation, userInformation, setbookingList, bookingList, setCookie,

    }}>
      <Layout>
        <Navigation />
        <main>
          <Routes />
        </main>
        <Footer />
      </Layout>
    </UserContext.Provider>
  )
}

export default App
