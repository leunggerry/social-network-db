/**
 * Import libraries
 */

const { User } = require("../models");

const userController = {
  //Functions for the methods go here
  /**
   * @description Get all the users
   * @param {*} req
   * @param {*} res
   */
  getUsers(req, res) {
    User.find({})
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  /**
   * @name getUserById
   * @param {*} param0
   * @param {*} res
   */
  getUserById({ params }, res) {
    User.findById(params.id)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  /**
   * @description Create a user
   * @param {*} param0
   * @param {*} res
   */
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  /**
   * @name updateUser
   * @param {*} param0
   * @param {*} res
   */
  updateUser({ params, body }, res) {
    // find single doc that we want to update
    // updateOne() or updateMany() update documents without returning them
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      // {new: true} will return the new version of the doc
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  /**
   * @name deleteUser
   *
   * @description Detele a user by id
   * @param {*} param0
   * @param {*} res
   */
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
