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
// const sequelize = require("../../config/connection");

router.get("/", (req, res) => {
  Achievements.findAll({
    attributes: ["id", "title", "genre", "game_id"],
    include: [
      {
        model: Game,
        attributes: ["id", "game_title"],
      },
    ],
  })
    .then((dbAchievmentData) => res.json(dbAchievmentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Grab one achievement
router.get("/:id", (req, res) => {
  Achievements.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "genre", "game_id"],
    include: [
      {
        model: Game,
        attributes: ["id", "game_title"],
      },
    ],
  })
    .then((dbAchievmentData) => res.json(dbAchievmentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//post new achievement
router.post("/", (req, res) => {
  Achievements.create({
    title: req.body.title,
    game_id: req.body.game_id,
    genre: req.body.genre,
  })
    .then((dbAchievmentData) => res.json(dbAchievmentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
