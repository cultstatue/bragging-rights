const { Like } = require("../models");

const likesData = [
  {
    count: 1,
    user_id: 1,
    post_id: 6,
  },
  {
    count: 1,
    user_id: 2,
    post_id: 5,
  },
  {
    count: 1,
    user_id: 3,
    post_id: 4,
  },
  {
    count: 1,
    user_id: 4,
    post_id: 3,
  },
  {
    count: 1,
    user_id: 5,
    post_id: 2,
  },
  {
    count: 1,
    user_id: 6,
    post_id: 1,
  },
  //   {
  //     count: 1,
  //     user_id: 1,
  //     post_id: 2,
  //   },
  //   {
  //     count: 1,
  //     user_id: 2,
  //     post_id: 3,
  //   },
  //   {
  //     count: 1,
  //     user_id: 3,
  //     post_id: 4,
  //   },
];
const seedLikes = () => Like.bulkCreate(likesData);

module.exports = seedLikes;
