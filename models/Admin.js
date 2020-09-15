const mongoose = require("mongoose");
const uuid = require("uuid");
const crypto = require("crypto");

var adminSchema = mongoose.Schema({
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
});

adminSchema
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
adminSchema.methods = {
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

module.exports = Admin = mongoose.model("Admin", adminSchema);
