/**
 * Import Libraries
 */
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, "Must be at least 1 character"],
      maxLength: [280, "Character length must be less than 280."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
      //ref: "User",
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  // add shcema options
  {
    toJSON: {
      getters: true, // tell mongoose to use specified getters
    },
  }
);

// Create Virtual for Reaction Count
ThoughtSchema.virtual("reactionCount").get(function () {
  // count how many reactions on this thought
  return this.reactions.length;
});

// Create the Though Model
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
