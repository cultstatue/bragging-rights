const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
const achievementRoutes = require("./achievement-route");
const gameRoutes = require("./game-routes");
const imageRoutes = require("./image-routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/achievements", achievementRoutes);
router.use("/games", gameRoutes);
router.use("/images", imageRoutes);

module.exports = router;
