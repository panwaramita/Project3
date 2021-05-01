// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var cors=require('cors');
// Requiring passport as we've configured it
var passport = require("./server/config/passport");
const router=require('./server/routes/memories');
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 5000;
// var db = require("./models");
const db=require("./server/models");
// Creating express app and configuring middleware needed for authentication
var app = express();

console.log(process.env.NODE_ENV);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/client/build"));
}
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
// require("./routes/html-routes.js")(app);
require("./server/routes/api-routes.js")(app);
app.use("/data",router);
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

