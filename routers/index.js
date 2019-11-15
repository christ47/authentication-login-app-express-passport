const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth")
// used to protect pages

router.get('/', (req, res) => res.render('welcome'));
// render the view named welcome

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
  name: req.user.name
}));

module.exports = router;
