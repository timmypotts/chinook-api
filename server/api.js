const express = require("express");
const path = require("path");
const bp = require("body-parser");
const cors = require("cors");
require("dotenv").config();
// logger
morgan = require("morgan");
// production
var compression = require("compression");
var helmet = require("helmet");

// Set up express app
app = express();
var PORT = 80;

// Requiring our models for syncing
var db = require("./models");

// Middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression()); //Compress all routes

// Routes
require("./routes/actor-routes")(app);
require("./routes/film-routes")(app);

db.sequelize.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT :: " + PORT);
  });
});
