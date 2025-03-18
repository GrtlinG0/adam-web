const mongoose = require('mongoose');
const express = require('express');
const timelineRoutes = require('./routes/timeline');
const path = require('path');

const app = express();
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/adam-dodavky';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Připojeno k MongoDB'))
  .catch(err => console.error('Chyba připojení k MongoDB:', err));

app.use(express.json());
app.use('/api', timelineRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(3000, () => console.log('Server běží na http://localhost:3000'));
