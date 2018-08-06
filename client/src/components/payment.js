import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleToken } from "../actions";
class Payment extends React.Component {
	render() {
		return (
			<StripeCheckout
				amount={500}
				name="Emaily"
				description="$5 fro 5 emaily credit"
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE}
			>
				<button className="btn">GET CREDITS</button>
			</StripeCheckout>
		);
	}
}

export default connect(
	null,
	{ handleToken }
)(Payment);
