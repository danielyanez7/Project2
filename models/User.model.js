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
      default: "https://qph.cf2.quoracdn.net/main-qimg-03a99309aab3f5536e1062649c2eff21-lq"
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
