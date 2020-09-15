const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  userId: {
    type: ObjectId,
  },
  subtasks: [
    {
      type: String,
    },
  ],
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
});

module.exports = Task = mongoose.model("Task", taskSchema);
