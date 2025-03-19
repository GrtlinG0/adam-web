const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',   
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

// POST nová zakázka
router.post('/', async (req, res) => {
  const job = new Job({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    category: req.body.category,
    categoryOther: req.body.category === 'Jiné' ? req.body.categoryOther : undefined,
    deadline: req.body.deadline
  });
  try {
    const newJob = await job.save();
    // Email notifikace
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'adamkural@proton.me',
        cc: req.body.email,
        subject: `Nová zakázka: ${newJob.category} od ${newJob.name}`,
        text: `
          Jméno: ${newJob.name}
          Email: ${newJob.email}
          Popis: ${newJob.description}
          Kategorie: ${newJob.category}${newJob.categoryOther ? ` (${newJob.categoryOther})` : ''}
          Termín: ${newJob.deadline || 'Neuveden'}
          Odesláno: ${newJob.createdAt}
        `
      };
      
    await transporter.sendMail(mailOptions);
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;