const router = require("express").Router();

//import all API routes from /api/index.js (index.js is not needed because it's implied)
const apiRoutes = require("./api");

// add prefix of 'api' to all the api routes imported from the 'api' directory
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
