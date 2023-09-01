const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// Signup page
router.get('/api/signup', (req, res) => {
  res.render('signup');
});

// User signup
router.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      password: hashedPassword
    });
    res.redirect('/api/auth/login');
  } catch (error) {
    res.render('signup', { error: 'Username already exists' });
  }
});

// Login page
router.get('/api/login', (req, res) => {
  res.render('login');
});

// User login
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    
    req.session.save(() => {
      req.session.userId = user.id;
    });

    res.redirect('/api/dashboard');
    
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

// Logout
router.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/api/');
});

module.exports = router;
