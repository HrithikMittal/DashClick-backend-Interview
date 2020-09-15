const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

const Admin = require("../models/Admin");

const signup = (req, res) => {
  if (req.body.email == undefined || req.body.password == undefined) {
    return res.json({ error: "Please provide email and password both" });
  }

  const newAdmin = new Admin(req.body);
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      if (admin) {
        return res.json({
          error: "Admin Already exists with email id! please login",
        });
      }
      newAdmin
        .save()
        .then((data) => {
          data.hashed_password = undefined;
          res.json({ message: "Admin signup successfully!", data });
        })
        .catch((err) => {
          console.log("Error in signup admin controller", err);
        });
    })
    .catch((err) => {
      console.log("Error in signup admin controller", err);
    });
};

const login = (req, res) => {
  if (req.body.email == undefined || req.body.password == undefined) {
    return res.json({ error: "Please provide email and password both" });
  }
  Admin.findOne({
    email: req.body.email,
  }).then((admin) => {
    if (!admin) {
      return res.json({ error: "Admin is not signup with this email Id" });
    }
    if (!admin.authenticate(req.body.password)) {
      return res.json({
        error: "UnAuthorized!Please give correct password",
      });
    }
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });
    admin.hashed_password = undefined;
    res.json({ token, admin });
  });
};

var requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

module.exports = { signup, login, requireSignIn };
