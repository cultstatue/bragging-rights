const router = require("express").Router();



// This is so if we make a request to an endpoint that doesnt exist
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
