const _ = require("underscore");
const Task = require("../models/Task");

const createTask = (req, res) => {
  const newTask = new Task(req.body);
  newTask
    .save()
    .then((data) => {
      res.json({ message: "Task is created successfully!", data });
    })
    .catch((err) => {
      console.log("Error in creating task", err);
      res.json({ error: err });
    });
};

const addUserToTask = (req, res) => {
  let task = req.task;
  let user = req.user;
  task.user = user;
  user.tasks = _.union(user.tasks, task);
  task
    .save()
    .then((data) => {
      user
        .save()
        .then(() => {
          res.json({ message: "User is added successfully!", data });
        })
        .catch((err) => {
          console.log("Error in adding the task to the user", err);
          res.json({ error: "Error in adding the task to the user" });
        });
    })
    .catch((err) => {
      console.log("Error in adding user to task", err);
      res.json({ error: err });
    });
};

var deep = function (a, b) {
  return _.isObject(a) && _.isObject(b) ? _.extend(a, b, deep) : b;
};

const updateTask = (req, res) => {
  let task = req.task;
  task = _.extend(task, req.body, deep);
  task
    .save()
    .then((data) => {
      res.json({ message: "Task is updated successfully!", data });
    })
    .catch((err) => {
      console.log("Error in updating the task", err);
      res.json({ error: err });
    });
};

const taskById = (req, res, next, id) => {
  Task.findById(id).exec((err, task) => {
    if (!task || err) {
      return res.json({ error: "Task Not found!" });
    }
    req.task = task;
    next();
  });
};

const deleteTask = (req, res) => {
  Task.findOneAndUpdate(req.task._id, { active: 0 })
    .then(() => {
      return res.json({ message: "Task deleted successfully" });
    })
    .catch((err) => {
      console.log("Error in deleting the task", err);
      res.json({ error: err });
    });
};

const getAllTasks = (req, res) => {
  Task.find()
    .then((tasks) => {
      return res.json({ message: "Getting all the tasks", tasks });
    })
    .catch((err) => {
      console.log("Error in getting all the task", err);
      res.json({ error: err });
    });
};

const getTask = (req, res) => {
  return res.json(req.task);
};

module.exports = {
  createTask,
  addUserToTask,
  updateTask,
  taskById,
  getAllTasks,
  getTask,
  deleteTask,
};
