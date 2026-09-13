const express = require('express');
const { submitContact } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

router.post('/', contactLimiter, submitContact);

module.exports = router;
