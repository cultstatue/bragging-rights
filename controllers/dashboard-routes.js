const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Game, Achievements, Image } = require("../models");

// load up the dashboard
router.get("/", (req, res) => {

  const gameData = Game.findAll({
    attributes: ["id", "game_title"],
  })

  const postData = Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'achievement_id',
      'created_at'  
      ],
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
      }
    ]
  })

  Promise
  .all([gameData, postData])
  .then(response => {
    const games = response[0].map((game) => game.get({ plain: true }));

    const posts = response[1].map((post) => post.get({ plain: true }));
    
    res.render('dashboard', { games, posts })
  })
  .catch(err => {
    console.log(err)
  })
  
});

module.exports = router;
