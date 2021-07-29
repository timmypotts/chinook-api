const db = require("../models");
const vetString = require("./vetters/vetString");

module.exports = filmMiddleware = {
  filmActorDup: (req, res, next) => {
    let checkFilm = vetInt(req.params.filmid);
    let checkAct = vetInt(req.params.actorid);
    if (checkAct === false || checkFilm === false) {
      res.status(400).json({ ERROR: "Please use valid ids (INT)" });
    } else {
      return db.film_actor
        .findOne({
          where: {
            actor_id: req.params.actorid,
            film_id: req.params.filmid,
          },
        })
        .then((junction) => {
          console.log("Result: " + junction);
          if (junction === null) {
            next();
          } else if (junction) {
            res.status(409).json({ Error: "This association already exists" });
          } else {
            res.status(500);
          }
        })
        .catch((err) => {
          res.send(err);
        });
    }
  },
};
