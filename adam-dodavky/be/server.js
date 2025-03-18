require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const timelineRoutes = require('./routes/timeline');
const jobsRoutes = require('./routes/jobs');
const path = require('path');
const cors = require('cors');

const app = express();
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/adam-dodavky';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Připojeno k MongoDB'))
  .catch(err => console.error('Chyba připojení k MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use('/api', timelineRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(3000, () => console.log('Server běží na http://localhost:3000'));
