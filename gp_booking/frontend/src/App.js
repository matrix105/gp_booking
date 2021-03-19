
import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Routes from "./Routes";
import "./components/css/style.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"
import { UserContext } from './context/Context'
import Cookies from 'js-cookie'

function App() {
  const [jwt, setjwt] = useState('')
  const [userInformation, setUserInformation] = useState(null)
  const [bookingList, setbookingList] = useState([])
  const [isAuth, setisAuth] = useState(false)


  const handleLogin = e => {
    e.preventDefault();
    setisAuth(true);
  }
  const handleLogout = e => {
    e.preventDefault();
    setisAuth(false);
  }

  const setCookie = (jwt) => {
    Cookies.set("token", jwt)
  }

  const readCookie = () => {
    const token = Cookies.get("token")
    if (token) {
      console.log(token);
      setisAuth(true);
      console.log(`is auth from appJS ${isAuth}`);
    }
  }


  return (
    <UserContext.Provider value={{
      jwt, setjwt, handleLogin, handleLogout, isAuth, setisAuth, setUserInformation, userInformation, setbookingList, bookingList, setCookie, readCookie,

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
