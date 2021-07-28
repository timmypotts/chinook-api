const express = require("express");
const path = require("path");
const bp = require("body-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Set up express app
app = express();
var PORT = 3080;

// Requiring our models for syncing
var db = require("./models");

// Middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

// Routes

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT :: " + PORT);
  });
});
