const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('44444444444444');
  res.send('GET request to /stockAnalyze');
});

module.exports = router;
