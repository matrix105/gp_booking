import React from "react";
import Layout from "./components/Layout";
import Routes from "./Routes";
import Form from './components/Form'



export default class App extends React.Component {

	render() {
		return (
			<Layout>
				<Routes />
				<Form />
			</Layout>

		);
	}
}