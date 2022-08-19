const router = require("express").Router();
const {
  User,
  Post,
  Like,
  Comment,
  Achievements,
  Game,
} = require("../../models");

//get all games
router.get("/", (req, res) => {
  Game.findAll({
    attributes: ["id", "game_title"],
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
