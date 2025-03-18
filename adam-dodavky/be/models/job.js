const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Přeprava', 'Přestavba', 'Jiné'] },
  categoryOther: { type: String },
  deadline: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);