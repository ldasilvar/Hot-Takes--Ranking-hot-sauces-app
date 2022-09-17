const express = require('express');
const router = express.Router();
const passwordSchema = require("../middleware/pass-verification");

const userCtrl = require('../controllers/users');
//Checks passwordSchema to ensure password is strong enough
router.post('/signup', passwordSchema, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;