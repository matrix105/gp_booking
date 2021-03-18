
import React, { useState } from "react";
import Layout from "./components/Layout";
import Routes from "./Routes";
import "./components/css/style.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"
import { UserContext } from './context/Context'

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

  return (
    <UserContext.Provider value={{ jwt, setjwt, handleLogin, handleLogout, isAuth, setUserInformation, userInformation, setbookingList, bookingList }}>
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
