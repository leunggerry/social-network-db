/**
 * Import libraries
 */

const { Thought, User } = require("../models");

const thoughtController = {
  //Functions for the methods go here
  /**
   * @description Get all the users
   * @param {*} req
   * @param {*} res
   */
  getThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  /**
   * @name getThoughtById
   * @param {*} param0
   * @param {*} res
   */
  getThoughtById({ params }, res) {
    Thought.findById(params.id)
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  /**
   * @description Create a a thought
   * @param {*} param0
   * @param {*} res
   */
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: body.userId }, // get the userId from the body to associate the thought to the user
          { $push: { thoughts: _id } }, // push the thought's id to the user who created it
          { new: true } // show th enew update User profile
        );
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  /**
   * @name updateThought
   * @param {*} param0
   * @param {*} res
   */
  updateThought({ params, body }, res) {
    // find single doc that we want to update
    // updateOne() or updateMany() update documents without returning them
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      // {new: true} will return the new version of the doc
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  /**
   * @name deleteThought
   *
   * @description Detele a thought by id
   * @param {*} param0
   * @param {*} res
   */
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deleteThought) => {
        if (!deleteThought) {
          res.status(404).json({ message: "No thought found with this ID" });
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId }, // get the UserId
          { $pull: { thoughts: params.thoughtId } }, // remove the thoughtId from the userId's thoughts
          { new: true }
        );
      })
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

module.exports = thoughtController;
