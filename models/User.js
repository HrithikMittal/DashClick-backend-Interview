const mongoose = require("mongoose");
const uuid = require("uuid");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  salt: String,
  hashed_password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
  },
  workingHours: {
    monday: {
      start: { type: Number, min: 0, max: 23 },
      end: { type: Number, min: 0, max: 23 },
    },
    tuesday: {
      start: { type: Number, min: 0, max: 23 },
      end: { type: Number, min: 0, max: 23 },
    },
    wednesday: {
      start: { type: Number, min: 0, max: 23 },
      end: { type: Number, min: 0, max: 23 },
    },
    thursday: {
      start: { type: Number, min: 0, max: 23 },
      end: { type: Number, min: 0, max: 23 },
    },
    friday: {
      start: { type: Number, min: 0, max: 23 },
      end: { type: Number, min: 0, max: 23 },
    },
    saturday: {
      start: { type: Number, min: 0, max: 23 },
      end: { type: Number, min: 0, max: 23 },
    },
    sunday: {
      start: { type: Number, min: 0, max: 23 },
      end: { type: Number, min: 0, max: 23 },
    },
  },
  tasks: [
    {
      type: ObjectId,
      ref: "Task",
    },
  ],
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid.v1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = User = mongoose.model("User", userSchema);
