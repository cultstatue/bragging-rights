const router = require("express").Router();
const sequelize = require("sequelize");
const {
  User,
  Post,
  Like,
  Comment,
  Achievements,
  Image,
  Game,
} = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
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

//grab a singular post by id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "img_id",
      "user_id",
      "achievement_id",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)"
        ),
        "like_count",
      ],
    ],
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
      {
        model: Image,
        attributes: ["id", "img_url"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a post
router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    img_id: req.body.img_id,
    achievement_id: req.body.achievement_id,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Like defined before post put/(.../:id), otherwise express will think the word addlike is a parameter for /:id
//PUT /api/posts/addlike
router.put("/addlike", withAuth, (req, res) => {
  //using our static model add-like
  Post.addlike(
    { ...req.body, user_id: req.session.user_id },
    { Like, Comment, User }
  )
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//Update post
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete a post
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ messgage: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
