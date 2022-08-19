const router = require("express").Router();
const { User, Post, Like, Comment, Achievements } = require("../../models");

router.get("/", (req, res) => {
  console.log("=================");
  Post.findAll({
    //Query Config
    attributes: ["id", "post_url", "title", "created_at"],
    // this shows our posts in most recent order
    order: [["created_at", "DESC"]],
    //performing the JOIN with include
    include: [
      {
        model: Achievements,
        attributes: ["id", "title"],
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
