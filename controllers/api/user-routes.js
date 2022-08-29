const router = require("express").Router();
const {
  User,
  Post,
  Like,
  Comment,
  Achievements,
  Image,
} = require("../../models");

//get all users /api/users
router.get("/", (req, res) => {
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["passowrd"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "img_id", "created_at", "achievement_id"],
        include: [
          {
            model: Achievements,
            attributes: ["id", "title"],
          },
          {
            model: Image,
            attributes: ["img_url"],
          },
        ],
      },
      //including likes
      {
        model: Post,
        attributes: ["title"],
        through: Like,
        as: "liked_posts",
      },
      // include the Comment model here:
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new user!
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      //accessing our session information
      req.session.save(() => {
        //we want to find our user_id, username, and declare that we are now logged in
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        //send data
        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Login route
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    // NOTE: We do not disclose whether the password or email is wrong to avoid safety concerns
    //If there is no data found with this email, send error
    if (!dbUserData) {
      res.status(400).json({
        message: "No account found with either your password or email",
      });
      return;
    }

    //check to see if the password entered is valid
    const validPassword = dbUserData.checkPassword(req.body.password);

    // if it is not valid, send error
    if (!validPassword) {
      res.status(400).json({
        message: "No account found with either your password or email",
      });
      return;
    }

    //another req session variable declaration
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

//Logout route
router.post("/logout", (req, res) => {
  //user the destroy method to clear our session
  //Check to see if we are logged in
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Delete a user at specified id
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
