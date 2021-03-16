
import React, { useState } from "react";
import Layout from "./components/Layout";
import Routes from "./Routes";
import "./components/css/style.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"

function App() {
  // const [isAuth, setisAuth] = useState(false)
  // console.log(isAuth);
  // const handleLogin = e => {
  //   e.preventDefault();
  //   setisAuth(true);
  // }
  // const handleLogout = e => {
  //   e.preventDefault();
  //   setisAuth(false);
  // }

  return (
    <Layout>

      <Navigation />
      <main>
        <Routes />
      </main>
      <Footer />
    </Layout>
  )
}

export default App
