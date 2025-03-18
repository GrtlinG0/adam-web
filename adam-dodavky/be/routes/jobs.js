const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// POST nová zakázka
router.post('/', async (req, res) => {
  const job = new Job({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    deadline: req.body.deadline
  });
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;