const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
    },
    height: {
      type: String,
    },
    weight: {
      type: String,
    },
    injuries: {
      type: String,
    },
    role: {
      type: String,
      enum: ['CLIENT', 'TRAINER', 'ADMIN'],
      default: 'CLIENT'
    },
    routines: [{
      type: Schema.Types.ObjectId,
      ref: 'Routine'
    }],
    clients: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
