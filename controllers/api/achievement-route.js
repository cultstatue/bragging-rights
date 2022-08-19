const router = require("express").Router();
const {
  User,
  Post,
  Like,
  Comment,
  Achievements,
  Game,
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

module.exports = router;
