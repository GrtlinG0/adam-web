const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }
});

module.exports = mongoose.model('Timeline', timelineSchema);
