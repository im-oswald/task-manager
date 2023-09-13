const express = require('express');
const { check, validationResult } = require('express-validator');
const Task = require('../../models/Task');
const auth = require('./../../middlewares/auth');

const router = express.Router();

// @route         /api/tasks
// @description   To list all the tasks of a user
// @access        Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ completed: 1, priority: '-1', date: '-1' });

    res.json(tasks);

  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/tasks
// @description   To add a new user task
// @access        Private
router.post('/', [auth, [
  check('title').not().isEmpty(),
  check('priority').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = new Task({
      title: req.body.title,
      priority: req.body.priority,
      completed: !!req.body.completed,
      user: req.user.id
    });

    await task.save();

    res.json(task);

  } catch(err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/tasks/:task_id
// @description   To list a specific task
// @access        Private
router.get('/:task_id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.task_id);

    if(!task) {
      return res.status(401).json({ errors: [{ msg: 'No task found' }] });
    }

    res.json(task);
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'No task found' }] });
    }

    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/tasks/:task_id
// @description   To update a specific task
// @access        Private
router.put('/:task_id', auth, async (req, res) => {
  try {
    const oldTask = await Task.findById(req.params.task_id);

    if(!oldTask) {
      return res.status(401).json({ errors: [{ msg: 'No task found' }] });
    }

    if(oldTask.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden action' }] });
    }

    const updatedTask = {
      title: oldTask.title,
      priority: oldTask.priority,
      completed: oldTask.completed,
      ...req.body
    };

    const task = await Task.findByIdAndUpdate(req.params.task_id, updatedTask, {
      new: true, // Return the updated document
    });

    res.json(task);
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'No task found' }] });
    }

    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route         /api/tasks/:post_id
// @description   To delete a specific task
// @access        Private
router.delete('/:task_id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.task_id);

    if(!task) {
      return res.status(404).json({ errors: [{ msg: 'No task found' }] });
    }

    if(task.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Forbidden action' }] });
    }

    await task.remove();

    res.send('Task deleted successfully');
  } catch(err) {
    console.log(err);

    if(err.kind == 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'No task found' }] });
    }

    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

module.exports = router;
