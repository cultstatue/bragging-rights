const router = require("express").Router();
const {
  User,
  Post,
  Like,
  Comment,
  Achievements,
  Game,
  Image,
} = require("../../models");
// const sequelize = require("../../config/connection");

router.get("/", (req, res) => {
  Achievements.findAll({
    attributes: ["id", "title", "genre", "game_id"],
    include: [
      {
        model: Game,
        attributes: ["id", "game_title"],
      },
    ],
  })
    .then((dbAchievmentData) => res.json(dbAchievmentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Grab one achievement
router.get("/:id", (req, res) => {
  Achievements.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "genre", "game_id"],
    include: [
      {
        model: Game,
        attributes: ["id", "game_title"],
      },
    ],
  })
    .then((dbAchievmentData) => res.json(dbAchievmentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//post new achievement
router.post("/", (req, res) => {
  Achievements.create({
    title: req.body.title,
    game_id: req.body.game_id,
    genre: req.body.genre,
  })
    .then((dbAchievmentData) => res.json(dbAchievmentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// change achievement 
router.put('/:id', (req, res) => {
  Achievements.update(

    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No achievement found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

module.exports = router;
