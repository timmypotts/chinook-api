// Needs models to connect
const db = require("../models");
// controllers
const actorController = require("../controllers/actorController");
const actorMid = require("../middleware/actor-middleware");

module.exports = (app) => {
  // ====================HANDLE ALL CREATE (POST) REQUESTS ======================
  app.post("/api/actors", actorMid.checkDuplicates, actorController.newActor);

  // ====================HANDLE ALL READ (GET) REQUESTS ======================

  //   Return all actors
  app.get("/api/actors", async (req, res) => {
    // var name = req.query.name;'
    req.query.order ? null : (req.query.order = "id");
    req.query.pages ? (req.query.pages *= 20) : (req.query.pages = 9999999999);
    if (req.query.name) {
      actorController.searchByName(req, res);
    } else {
      actorController.getAll(req, res);
    }
  });

  //   Get all films from actor
  app.get("/api/actors/:id/films", actorController.findFilms);

  // ====================HANDLE ALL UPDATE (PUT) REQUESTS ======================
  app.put("/api/actors/:id", actorController.alterActor);

  // ====================HANDLE ALL DELETE (DELETE) REQUESTS ======================
  app.delete("/api/actors/:id", actorController.deleteActor);
};
