require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const timelineRoutes = require('./routes/timeline');
const jobsRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');
const Timeline = require('./models/timeline');
const path = require('path');
const cors = require('cors');

const app = express();
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/adam-dodavky';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Připojeno k MongoDB');
  // Inicializace dat pro Přestavbu dodávky, pokud je kolekce prázdná
  const count = await Timeline.countDocuments();
  if (count === 0) {
    await Timeline.insertMany([
      {
        date: '2025-03-09',
        title: 'Odstranění plochých hmoždinek z původních dřevěných desek',
        description: 'První úkol byl odstranit ploché hmoždinky z obrázku, jako účinný způsob se mi osvědčilo vzít hmoždinku kleštěmi a prostě ji vytrhnout, to se tedy líp říká než dělá, ale po nějakém tom trápení jsem si už našel svůj grip a relativně to šlo.',
        image: '/images/hmozdinky.jpg'
      },
      {
        date: '2025-03-09',
        title: 'Odstraněná většina hmoždinek z nákladního prostoru',
        description: 'Skoro všechny desky jsou již zbaveny hmoždinek, zbývají jen desky na bočních a zadních dveřích, které zatím nejsou nutně třeba a mohu se posunout na podlahu.',
        image: '/images/hmozdinky_pryc.jpg'
      }
    ]);
    console.log('Původní data pro Přestavbu dodávky vložena');
  }
})
.catch(err => console.error('Chyba připojení k MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use('/api', timelineRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/auth', authRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(3000, () => console.log('Server běží na http://localhost:3000'));
