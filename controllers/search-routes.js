const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Achievements, Game, Image } = require("../models");
// route the searched post
router.get("/:game_title", (req, res) => {
  console.log("=================");
  Post.findAll({
    //Query Config
    attributes: [
      "id",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)"
        ),
        "like_count",
      ],
    ],
    // this shows our posts in most recent order
    order: [["created_at", "DESC"]],
    //performing the JOIN with include
    include: [
      {
        model: Image,
        attributes: ["id", "img_url"],
      },
      {
        model: Achievements,
        attributes: ["id", "title"],
        include: {
          model: Game,
          attributes: ["id", "game_title"],
        },
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    //create a promise that captures response from database call
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No posts found with this title" });
        return;
      }
      console.log(req.params.game_title);
      // serializing our data
      const postData = dbPostData.map((post) => post.get({ plain: true }));

      let posts = postData.filter((element) => {
        return element.achievement.game.game_title == req.params.game_title;
      });

      res.render("search-result", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
