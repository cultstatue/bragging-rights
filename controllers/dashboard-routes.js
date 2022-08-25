const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Game, Achievements } = require("../models");

// load up the dashboard
router.get("/", (req, res) => {
  // send current games database
  Game.findAll({
    attributes: ["id", "game_title"],
  })
    .then((dbGamesData) => {
      const games = dbGamesData.map((game) => game.get({ plain: true }));
      res.render("dashboard", { games });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
