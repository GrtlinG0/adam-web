const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Chyba při ověření transporteru:', error);
  } else {
    console.log('Transporter je připraven k odesílání emailů');
  }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Přístup odepřen' });
    
    jwt.verify(token, process.env.JWT_SECRET || 'tajny-klic', (err, user) => {
      if (err) return res.status(403).json({ message: 'Neplatný token' });
      req.user = user;
      next();
    });
  };

router.post('/', async (req, res) => {
  console.log('Přijatá data:', req.body);
  const job = new Job({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    category: req.body.category,
    categoryOther: req.body.category === 'Jiné' ? req.body.categoryOther : undefined,
    phone: req.body.phone,
    deadline: req.body.deadline
  });

  try {
    const newJob = await job.save();
    console.log('Uložená zakázka v DB:', newJob.toObject());

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'adamkural@proton.me',
      cc: req.body.email,
      replyTo: req.body.email,
      subject: `Nová zakázka: ${newJob.category} od ${newJob.name}`,
      text: `
        Jméno: ${newJob.name}
        Email: ${newJob.email}
        Telefon: ${newJob.phone || 'Neuveden'}
        Popis: ${newJob.description}
        Kategorie: ${newJob.category}${newJob.categoryOther ? ` (${newJob.categoryOther})` : ''}
        Termín: ${newJob.deadline || 'Neuveden'}
        Odesláno: ${newJob.createdAt}
      `
    };

    console.log('Mail options:', mailOptions);
    await transporter.sendMail(mailOptions);
    res.status(201).json(newJob);
  } catch (err) {
    console.error('Chyba při odesílání emailu:', err);
    res.status(400).json({ message: err.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
      const jobs = await Job.find();
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;