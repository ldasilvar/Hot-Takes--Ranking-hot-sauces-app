const express = require('express');
const router = express.Router();
const passwordSchema = require("../middleware/pass-verification");

const userCtrl = require('../controllers/users');

router.post('/signup', passwordSchema, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;