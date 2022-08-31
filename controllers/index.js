const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes.js");
const searchRoutes = require("./search-routes");

//routes to our database
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/search", searchRoutes);

// This is so if we make a request to an endpoint that doesnt exist
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
