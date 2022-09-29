/**
 * Import Libraries
 */
const { Schema, model } = require("mongoose");

// Create the User schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate User email
      match: [/.+\@.+\..+/],
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    //_id: false, // id is false b/c this virtual that Mongoose returns, and don't need
  }
);

// Create a friend count virtual
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// Create the model with the schema
const User = model("User", UserSchema);

module.exports = User;
