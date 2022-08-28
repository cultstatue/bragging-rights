const router = require("express").Router();
const {
  User,
  Post,
  Like,
  Comment,
  Achievements,
  Game,
  Image,
} = require("../../models");
const withAuth = require("../../utils/auth");

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

//get onegames
router.get("/:id", (req, res) => {
  Game.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "game_title"],
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Create new game
router.post("/", withAuth, (req, res) => {
  Game.create({
    game_title: req.body.game_title,
  })
    .then((dbGameData) => res.json(dbGameData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
