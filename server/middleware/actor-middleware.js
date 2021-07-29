const { violet } = require("color-name");
const db = require("../models");
const vetString = require("./vetters/vetString");
module.exports = actorMiddleware = {
  checkDuplicates: (req, res, next) => {
    // This first checks to see if there are any numbers in the input and corrects capitalization
    req.body.firstname = vetString(req.body.firstname);
    req.body.lastname = vetString(req.body.lastname);
    if (req.body.firstname === false || req.body.lastname === false) {
      return res.status(400).json({ ERROR: "Please do not use ints" });
    } else {
      // This checks for duplicate entries
      return db.actors
        .findOne({
          where: {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
          },
        })
        .then((actor) => {
          console.log("Result: " + actor);
          // Means there is no actor found
          if (actor === null) {
            next();
          }
          // Means there is another actor already in the database
          else if (actor) {
            res.status(409).json({ ERROR: "Actor already exists in database" });
          } else {
            res.status(500);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    }
  },
};
