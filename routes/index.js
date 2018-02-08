const express = require('express');
const router = express.Router();

//TODO: authenticate

router.use('/clients', require('./clients'));

module.exports = router;