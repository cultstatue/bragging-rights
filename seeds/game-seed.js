const { Game } = require("../models");

const gameData = [
  {
    game_title: "Minecraft",
  },
  {
    game_title: "COD zombies",
  },
  {
    game_title: "Glitchers",
  },
];
const seedGames = () => Game.bulkCreate(gameData);

module.exports = seedGames;
