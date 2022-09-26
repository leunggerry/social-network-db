/**
 * Import required libraries
 */
const router = require("express").Router();
//import user controller methods

const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");

// Set up all GET and POST at /api/thoughts
// for getAllThoughts and createThought
router.route("/").get(getThoughts).post(createThought);

// Set up GET, PUT, DELETE route at /api/thoughts/:id
router.route("/:id").get(getThoughtById).put(updateThought);

// delete a thought and take User id
router.route("/:userId/:thoughtId").delete(deleteThought);

module.exports = router;
