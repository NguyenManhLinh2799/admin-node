var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const adminController = require('../controllers/admin-controller');
const superAdminController = require('../controllers/super-admin-controller');

// Home
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('index', { user: req.user });
});



// Profile page
router.get('/profile', adminController.profile);

// Change profile
router.post('/change-profile', adminController.changeProfile);
//<h6 class="admin-name"><%= user.fullname %> <% if (user.issuper) { %>(Super Admin)<% } %></h6>



// Change password
router.get('/change-password', (req, res) => {
  res.render('change-password', { user: req.user });
});

// Change password handle
router.post('/change-password', adminController.changePassword);



// Login
router.get('/login', (req, res) => {
  res.render('login', { layout: 'auth-layout' });
});

// Login handle
router.post('/login', adminController.login);



// Forget password
router.get('/forget-password', (req, res) => {
  res.render('forget-password', { layout: 'auth-layout' });
});

// Reset password
router.get('/reset-password', (req, res) => {
  res.render('reset-password', { layout: 'auth-layout' });
});



// Logout
router.get('/logout', adminController.logout);



// User stat
router.get('/stat-user', (req, res) => {
  res.render('stat-user');
});

// Note stat
router.get('/stat-note', (req, res) => {
  res.render('stat-note');
});



// User manage
router.get('/manage-user', adminController.manageUser);

// User info
router.get('/info-user/:id', adminController.userInfo);



// Admin manage
router.get('/manage-admin', superAdminController.manageAdmin);

// Create admin
router.get('/create-admin', (req, res) => {
  res.render('create-admin');
});

module.exports = router;
