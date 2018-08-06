import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { fetchUser } from "../actions";
import { connect } from "react-redux";
import Header from "./header";
import Landing from "./landing";

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header auth={this.props.auth} />
						<Switch>
							<Route exact={true} path="/" component={Landing} />
						</Switch>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(
	mapStateToProps,
	{ fetchUser }
)(App);
