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
    routines: [String],
    imageUrl: {
      type: String,
      default: "https://ih1.redbubble.net/image.2595320116.9420/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
    },
    clients: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    applications: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    workdays: [String]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
