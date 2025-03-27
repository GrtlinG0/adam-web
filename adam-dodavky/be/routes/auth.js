const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'tajny-klic'; // Přidej do .env

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Špatné jméno nebo heslo' });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;