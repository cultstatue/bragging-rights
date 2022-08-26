const { Post } = require("../models");

const postData = [
  {
    title: "Jumped over a rock",
    img_id: 1,
    user_id: 1,
    achievement_id: 1,
  },
  {
    title: "Mined a tree!",
    img_id: 2,
    user_id: 2,
    achievement_id: 2,
  },
  {
    title: "Shot a zombie",
    img_id: 3,
    user_id: 3,
    achievement_id: 3,
  },
  {
    title: "Got a legendary gun",
    img_id: 4,
    user_id: 4,
    achievement_id: 4,
  },
  {
    title: "Glitched!",
    img_id: 5,
    user_id: 5,
    achievement_id: 6,
  },
  {
    title: "Snuck into glitch",
    img_id: 6,
    user_id: 6,
    achievement_id: 5,
  },
];
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
