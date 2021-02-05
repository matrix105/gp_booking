import React from "react"; 
import Layout from "./components/Layout";
import Routes from "./Routes";



	export default class App extends React.Component {

		render() {
		  return (
			<Layout>
			  <Routes />
			</Layout>
		  );
		}
	  }