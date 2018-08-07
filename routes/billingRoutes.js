const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripe_secret);
const requireLoginMidddleware = require("../middleware/requireLogin");

module.exports = app => {
	app.post("/api/stripe", requireLoginMidddleware, async (req, res) => {
		if (!req.user) {
			return res.status(401).send({ error: " Not logged in" });
		}
		//console.log(req.body.id);
		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			source: req.body.token.id, // obtained with Stripe.js
			description: "Charge for Emaily"
		});
		console.log(charge);
		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	});
};
