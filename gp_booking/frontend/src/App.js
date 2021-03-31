
import React from "react";
import Layout from "./components/Layout";
import Routes from "./Routes";
import "./components/css/style.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"
import UserContextProvider from './context/Context'
function App() {
  return (
    <UserContextProvider>
      <Layout>
        <Navigation />
        <main>
          <Routes />
        </main>
        <Footer />
      </Layout>
    </UserContextProvider>

  )
}

export default App
