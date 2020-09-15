const User = require("../models/User");
const _ = require("underscore");
const Admin = require("../models/Admin");

const signupUser = (req, res) => {
  req.body.password = "password@123";
  if (req.body.email == undefined || req.body.password == undefined) {
    return res.json({ error: "Please provide email and password both" });
  }

  const newUser = new User(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.json({
          error: "User Already exists with email id! please login",
        });
      }
      newUser
        .save()
        .then((data) => {
          data.hashed_password = undefined;
          res.json({ message: "User signup successfully!", data });
        })
        .catch((err) => {
          console.log("Error in signup user controller", err);
        });
    })
    .catch((err) => {
      console.log("Error in signup user controller", err);
    });
};

const userBydId = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (!user || err) {
      return res.json({ error: "User Not Found!" });
    }
    req.user = user;
    next();
  });
};

const getAllUsers = (req, res) => {
  User.find()
    .then((user) => {
      res.json({ message: "Users get successfully!", user });
    })
    .catch((err) => {
      console.log("Error in getting all the users");
      res.json({ error: "In getting user" });
    });
};

var deep = function (a, b) {
  return _.isObject(a) && _.isObject(b) ? _.extend(a, b, deep) : b;
};

const updateUser = (req, res) => {
  let user = req.user;
  user = _.extend(user, req.body, deep);
  user
    .save()
    .then((user) => {
      res.json({ message: "User update successfully!", user });
    })
    .catch((err) => {
      console.log("Error in updating the user", err);
      res.json({ error: "In updating user" });
    });
};

const deleteUser = (req, res) => {
  Admin.deleteOne({ _id: req.user._id })
    .then((user) => {
      return res.json({ message: "User delte successfully!", user });
    })
    .catch((err) => {
      console.log("Error in deleting controller", err);
    });
};

const getUser = (req, res) => {
  return res.json(req.user);
};

module.exports = {
  signupUser,
  userBydId,
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
};
