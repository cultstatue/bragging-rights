const { Achievements } = require("../models");

const achievementData = [
  {
    title: "Rock Hopper",
    game_id: 1,
  },
  {
    title: "TRee Whacker",
    game_id: 1,
  },
  {
    title: "Headshot!",
    game_id: 2,
  },
  {
    title: "Click click, reload",
    game_id: 2,
  },
  {
    title: "Im here, no there!",
    game_id: 3,
  },
  {
    title: "Whoops!",
    game_id: 3,
  },
];
const seedAchievements = () => Achievements.bulkCreate(achievementData);

module.exports = seedAchievements;
