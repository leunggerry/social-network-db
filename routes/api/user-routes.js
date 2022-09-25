/**
 * Import required libraries
 */
const router = require("express").Router();
//import user controller methods

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// Set up all GET and POST at /api/users
// for getAllUsers and createUser
router.route("/").get(getUsers).post(createUser);

// Set up GET, PUT, DELETE route at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
