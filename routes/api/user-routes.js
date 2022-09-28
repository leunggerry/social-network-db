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
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// Set up all GET and POST at /api/users
// for getAllUsers and createUser
router.route("/").get(getUsers).post(createUser);

// Set up GET, PUT, DELETE route at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Setup add a friend (POST) and remove a friend (DELTE)
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
