// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
const queryFunctions = require('./query_functions/database');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['lotr']
}));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const loginRoutes = require("./routes/login");
const storiesRoutes = require("./routes/stories");
const contributionsRoutes = require("./routes/contributions");
const votesRoutes = require("./routes/votes");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/login", loginRoutes());
app.use("/api/stories", storiesRoutes(queryFunctions));
app.use("/api/contributions", contributionsRoutes(queryFunctions));
app.use("/api/votes", votesRoutes(queryFunctions));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


/** For query testing  to be removed at the end
 *   const { markContrAsAccepted } = require('./query_functions/database');
 *
 *  const options = {
 *    contribution_id: 17
 *  };
 *
 *  console.log(markContrAsAccepted(options));
 *
 */
