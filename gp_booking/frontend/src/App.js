import React from "react";
import Layout from "./components/Layout";
import Routes from "./Routes";
import "./components/css/style.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Navigation />
        <main>
          <Routes />
        </main>
        <Footer />
      </Layout>
    );
  }
}
