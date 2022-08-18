const { User } = require("../models");

const userData = [
  {
    username: "clairecashmore",
    email: "claire@gmail.com",
    password: "password",
    number_of_achievements: 1,
  },
  {
    username: "bob",
    email: "bob@gamil.com",
    password: "123password",
    number_of_achievements: 2,
  },
  {
    username: "user3",
    email: "user3@gmail",
    password: "user3password",
    number_of_achievements: 3,
  },
  {
    username: "user4",
    email: "user4@gmail",
    password: "user4password",
    number_of_achievements: 4,
  },
  {
    username: "user5",
    email: "user5@gmail",
    password: "user5password",
    number_of_achievements: 5,
  },
  {
    username: "user6",
    email: "user6@gmail",
    password: "user6password",
    number_of_achievements: 0,
  },
];
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
