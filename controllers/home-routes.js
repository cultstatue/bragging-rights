const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Achievements, Game, Image } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("homepage");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      //include the comments made on this post with their username and achievements
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      // include the username of the post-author
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Achievements,
        attributes: ["id", "title", "game_id"],
        include: {
          model: Game,
          attributes: ["game_title"],
        },
      },
      {
        model: Image,
        attributes: ["id", "img_url"]
      }
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      //serializing our data
      const post = dbPostData.get({ plain: true });

      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  //check to see if there is a current session for a user and redirect to homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
