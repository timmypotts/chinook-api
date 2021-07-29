const db = require("../models");
const { Op } = require("sequelize");
const vetInt = require("../middleware/vetters/vetInt");

module.exports = actorController = {
  // CREATE NEW ACTOR
  newActor: (req, res) => {
    db.actors
      .create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
      })
      .then((actor) => {
        res.status(201).json({ msg: "Actor created successfully", actor });
      })
      .catch((err) => {
        res.status(500).json(err); // findFilms: (req, res) => {},
      });
  },

  // ALL FILMS FROM ONE ACTOR BY ID
  findFilms: async (req, res) => {
    console.log("hit");
    if (!vetInt(req.params.id)) {
      res.status(400).json({ ERROR: "Please use a valid actor id" });
    } else {
      // Sequelize isnt perfect so it was just easier to write this out as a raw query
      const [results, metadata] = await db.sequelize.query(
        `SELECT 
          films.title,
          actors.first_name,
          actors.last_name
        FROM actors
        JOIN film_actor
          ON actors.id=film_actor.actor_id
        JOIN films
          ON film_actor.film_id=films.id
        WHERE actors.id=${req.params.id};`
      );
      if (results.length === 0) {
        res.status(409).json({ msg: "Not found" });
      } else {
        res.status(200).json(results);
      }
    }
  },

  // RETURN ALL ACTORS
  getAll: (req, res) => {
    db.actors
      .findAll({
        order: [[req.query.order, "DESC"]],
        limit: req.query.pages,
      })
      .then((actors) => {
        res.status(200).json(actors);
      });
  },

  // SEARCH BY NAME
  searchByName: (req, res) => {
    return db.actors
      .findAll({
        where: {
          [Op.or]: [
            { first_name: { [Op.iLike]: "%" + req.query.name + "%" } },
            { last_name: { [Op.iLike]: "%" + req.query.name + "%" } },
          ],
        },
        order: [[req.query.order, "ASC"]],
        limit: req.query.pages,
      })
      .then((actors) => {
        if (actors.length === 0) {
          res.status(409).json({ msg: "No actor found" });
        } else {
          res.status(200).json(actors);
        }
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // UPDATE ACTOR BY ID
  alterActor: (req, res) => {
    // If both first and last name are provided
    if (req.body.firstname && req.body.lastname) {
      db.actors
        .update(
          {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
          },
          {
            where: {
              id: req.params.id,
            },
            returning: true,
            plain: true,
          }
        )
        .then((actor) => {
          console.log("RESULT:  " + actor);
          res.status(200).json(actor);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
    // IF JUST FIRST NAME
    else if (req.body.firstname && !req.body.lastname) {
      db.actors
        .update(
          {
            first_name: req.body.firstname,
          },
          {
            where: {
              id: req.params.id,
            },
            returning: true,
            plain: true,
          }
        )
        .then((actor) => {
          res.status(200).json(actor);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else if (!res.body.firstname && res.body.lastname) {
      db.actors
        .update(
          {
            last_name: req.body.lastname,
          },
          {
            where: {
              id: req.params.id,
            },
            returning: true,
            plain: true,
          }
        )
        .then((actor) => {
          res.status(200).json(actor);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res
        .status(400)
        .json({ ERROR: "Please include a first name, a last name, or both" });
    }
  },

  // DELETE ACTOR
  deleteActor: (req, res) => {
    return db.actors
      .destroy({
        where: { id: req.params.id },
      })
      .then((result) => {
        console.log(result);
        res.status(210).json({ msg: "Actor Deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  },
};
