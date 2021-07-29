const db = require("../models");
const { Op } = require("sequelize");
const vetInt = require("../middleware/vetters/vetInt");

module.exports = filmController = {
  // Creates association between an existing actor to film through the junction table
  createJunction: (req, res) => {
    // Checks if association already exists, sends error if one does
    return db.film_actor
      .create({
        actor_id: req.params.actorid,
        film_id: req.params.filmid,
      })
      .then((result) => {
        console.log(result);
        res
          .status(201)
          .json({ msg: "Actor successfully associated with film" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getActors: async (req, res) => {
    const [results, metadata] = await db.sequelize.query(
      `SELECT 
        films.title, 
        actors.first_name,
        actors.last_name
      FROM films
      JOIN film_actor
        ON films.id=film_actor.film_id
      JOIN actors
        ON film_actor.actor_id=actors.id
      WHERE films.id=${req.params.id};`
    );
    if (results.length === 0) {
      res.status(409).json({ msg: "Not found" });
    } else {
      res.status(200).json(results);
    }
  },
};
