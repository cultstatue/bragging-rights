const User = require("./User");
//import our Post model
const Post = require("./Post");
//import our Like model
const Like = require("./Like");
//import our COmment model
const Comment = require("./Comment");

const Game = require("./Game");

const Achievements = require("./Achievment");

const Image = require("./Image");

//Create our model associations
//Note: User to Post is one to Many
User.hasMany(Post, {
  foreignKey: "user_id",
});

//Make reverse assocation to ensure Post cant belong to any others
Post.belongsTo(User, {
  foreignKey: "user_id",
});

//associating Like with both User and Post
// Now we can query both User and Post to see their Like data AKA how many likes a user has made OR how many likes a post has
User.belongsToMany(Post, {
  through: Like,
  as: "liked_posts",
  foreignKey: "user_id",
});

Post.belongsToMany(User, {
  through: Like,
  as: "liked_posts",
  foreignKey: "post_id",
});

//BUT what about the direct relationship between User - Like and Post - Like
// We should still include this >>
Like.belongsTo(User, {
  foreignKey: "user_id",
});

Like.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Like, {
  foreignKey: "user_id",
});

Post.hasMany(Like, {
  foreignKey: "post_id",
});

//Comment model associations
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Post.hasOne(Achievements, {
  foreignKey: "achievement_id",
});

// This one is weird, make sure you dont switch Post and Achievements here, or else it will not know what your are referencing
Post.belongsTo(Achievements, {
  foreignKey: "achievement_id",
});

//Games and Achievement association
Achievements.belongsTo(Game, {
  foreignKey: "game_id",
});
Game.hasMany(Achievements, {
  foreignKey: "game_id",
});

//Post image association
Post.hasOne(Image, {
  foreignKey: "img_id",
});

Post.belongsTo(Image, {
  foreignKey: "img_id",
});

module.exports = { Post, User, Like, Game, Achievements, Comment, Image };
