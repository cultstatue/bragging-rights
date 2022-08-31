const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Achievements, Game, Image } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    //Query Config
    attributes: ["id", "title", "created_at"],
    // this shows our posts in most recent order

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
          attributes: ["game_title"],
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
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
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
        attributes: ["id", "img_url"],
      },
    ],
  })
    .then((dbPostData) => {
      // console.log(dbPostData);
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
      const posts = [];
      console.log(postData);
      postData.forEach((post) => {
        const postArray = Object.entries(post);
        const filtered = postArray.filter(function (post) {
          return post.achievement.game.game_title === req.params.game_title;
        });
        console.log(filtered);
      });
      // const posts = postData.filter(function (post) {
      //   return post.achievement.game.game_title === req.params.game_title;
      // });
      // const posts = dbPostData.map((post) => post.get({ plain: true }));

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
