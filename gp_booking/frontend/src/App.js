
import React from "react";
import Layout from "./components/Layout";
import Routes from "./Routes";
import "./components/css/style.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {

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
