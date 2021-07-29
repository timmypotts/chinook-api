var db = require("../models");
const filmMid = require("../middleware/film-middleware");
const filmController = require("../controllers/filmController");
const vetInt = require("../middleware/vetters/vetInt");

module.exports = function (app) {
  // =================Handles CREATE (post) requests ================================================================

  // Creates association between an existing actor to film through the junction table
  app.post(
    "/api/films/film=:filmid/actor=:actorid",
    filmMid.filmActorDup,
    filmController.createJunction
  );

  // ==================Handles READ (get) requests ====================================================================

  // Fetches all actors that appeared in a film
  app.get("/api/films/:id/actors", filmController.getActors);
};
