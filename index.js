const express = require("express");
var bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const app = express();
const mongoose = require("mongoose");
require("./models/user");
require("./services/passport");
const keys = require("./config/keys");

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookie_key]
	})
);

app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(keys.mongo_uri);

require("./routes/authRoutes")(app); //for the routes
require("./routes/billingRoutes")(app); //for the routes

if (process.env.NODE_ENV === "production") {
	//make sure that express will serve up production assets
	app.use(express.static("client/build"));
	//express will serve index.html if it does not recognise route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log("Server started");
});
