const express = require('express');
const router = express.Router();

//the api routes passing through the index file here
router.use(require('./voteRoute'));
router.use(require('./voterRoutes'));
router.use(require('./candidateRoutes'));

module.exports = router;