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
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// Set up all GET and POST at /api/thoughts
// for getAllThoughts and createThought
router.route("/").get(getThoughts).post(createThought);

// Set up GET, PUT, DELETE route at /api/thoughts/:id
router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);

// Setup POST and DELETE a reaction
router.route("/:thoughtId/reactions").post(addReaction);

// Delete route for a reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
