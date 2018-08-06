const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripe_secret);

module.exports = app => {
	app.post("/api/stripe", async (req, res) => {
		//console.log(req.body.id);
		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			source: req.body.token.id, // obtained with Stripe.js
			description: "Charge for Emaily"
		});
		console.log(charge);
	});
};
