const seedUsers = require("./user-seed");
const seedPosts = require("./post-seed");
const seedComments = require("./comment-seed");
const seedLikes = require("./like-seed");
const seedGames = require("./game-seed");
const seedImages = require("./image-seed");
const seedAchievements = require("./achievement-seed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  console.log("SEEDED USERS");
  await seedGames();
  console.log("SEEDED GAMES");
  await seedAchievements();
  console.log("SEEDED ACHIEVEMENTS");
  await seedImages();
  console.log("SEEDED IMAGES");
  await seedPosts();
  console.log("SEEDED POSTS");
  await seedComments();
  console.log("SEEDED Comments");

  process.exit(0);
};

seedAll();
