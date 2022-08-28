const router = require("express").Router();
const {
  User,
  Post,
  Like,
  Comment,
  Achievements,
  Image,
} = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Image.findAll({})
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/", withAuth, (req, res) => {
  //using uploader when image is trying to be created

  Image.create({
    img_url: req.body.img_url,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
