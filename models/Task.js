const mongoose = require('../db');

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  created_at: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;