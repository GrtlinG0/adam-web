const express = require('express');
const router = express.Router();
const Timeline = require('../models/Timeline');

// GET všechny položky časové osy
router.get('/', async (req, res) => {
  try {
    const items = await Timeline.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST nová položka
router.post('/', async (req, res) => {
  const timelineItem = new Timeline({
    date: req.body.date,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  });
  try {
    const newItem = await timelineItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
