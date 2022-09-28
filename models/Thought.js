/**
 * Import Libraries
 */
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Create Reaction Schema
const ReactionSchema = new Schema(
  {
    // set custom id for each reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: [280, "Character length must be less than 280."],
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  // add shcema options
  {
    toJSON: {
      getters: true, // tell mongoose to use specified getters
    },
  }
);

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
    },
    reactions: [ReactionSchema],
  },
  // add shcema options
  {
    toJSON: {
      getters: true, // tell mongoose to use specified getters
      virtuals: true,
    },
    id: false,
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
