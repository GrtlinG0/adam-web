const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const timelineRoutes = require('./routes/timeline');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Připojení k MongoDB
mongoose.connect('mongodb://localhost/adam-dodavky', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Připojeno k MongoDB'));

// Routy
app.use('/api/timeline', timelineRoutes);

app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});
