var express = require('express');
var router = express.Router();

const adminController = require('../controllers/admin-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Profile page
router.get('/profile', (req, res) => {
  res.render('profile');
});

// Change password
router.get('/change-password', (req, res) => {
  res.render('change-password');
});

// Login
router.get('/login', (req, res) => {
  res.render('login', { layout: 'auth-layout' });
});

// Forget password
router.get('/forget-password', (req, res) => {
  res.render('forget-password', { layout: 'auth-layout' });
});

// Reset password
router.get('/reset-password', (req, res) => {
  res.render('reset-password', { layout: 'auth-layout' });
});


// Logout
router.get('/logout', (req, res) => {
  res.redirect('/login');
});

// User stat
router.get('/stat-user', (req, res) => {
  res.render('stat-user');
});

// Note stat
router.get('/stat-note', (req, res) => {
  res.render('stat-note');
});

// User manage
router.get('/manage-user', (req, res) => {
  res.render('manage-user');
});

// User info
router.get('/info-user', (req, res) => {
  res.render('info-user');
});

// Admin manage
router.get('/manage-admin', adminController.manageAdmin);

// Create admin
router.get('/create-admin', (req, res) => {
  res.render('create-admin');
});

module.exports = router;
