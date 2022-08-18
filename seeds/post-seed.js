const { Post } = require("../models");

const postData = [
  {
    title: "Jumped over a rock",
    post_url: "www.google.com",
    user_id: 1,
    achievement_id: 1,
  },
  {
    title: "Mined a tree!",
    post_url: "www.google.com",
    user_id: 2,
    achievement_id: 2,
  },
  {
    title: "Shot a zombie",
    post_url: "www.google.com",
    user_id: 3,
    achievement_id: 3,
  },
  {
    title: "Got a legendary gun",
    post_url: "www.google.com",
    user_id: 4,
    achievement_id: 4,
  },
  {
    title: "Glitched!",
    post_url: "www.google.com",
    user_id: 5,
    achievement_id: 6,
  },
  {
    title: "Snuck into glitch",
    post_url: "www.google.com",
    user_id: 6,
    achievement_id: 5,
  },
];
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
