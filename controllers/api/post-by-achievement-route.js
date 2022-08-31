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

//grab a singular post by id
router.get("/:achievement_id", (req, res) => {
  Post.findAll({
    where: {
      achievement_id: req.params.achievement_id,
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
      console.log(dbPostData);
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

module.exports = router;
