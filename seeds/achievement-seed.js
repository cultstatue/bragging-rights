const { Achievements } = require("../models");

const achievementData = [
  {
    title: "Rock Hopper",
    game_id: 1,
    genre: "environment",
  },
  {
    title: "TRee Whacker",
    game_id: 1,
    genre: "environment",
  },
  {
    title: "Headshot!",
    game_id: 2,
    genre: "shooter",
  },
  {
    title: "Click click, reload",
    game_id: 2,
    genre: "shooter",
  },
  {
    title: "Im here, no there!",
    game_id: 3,
    genre: "glitch",
  },
  {
    title: "Whoops!",
    game_id: 3,
    genre: "glitch",
  },
];
const seedAchievements = () => Achievements.bulkCreate(achievementData);

module.exports = seedAchievements;
