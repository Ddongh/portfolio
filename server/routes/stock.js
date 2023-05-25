const express = require('express');
const router = express.Router();


router.get('/stockAnalyze', (req, res) => {
  const responseData = {
    message: 'stockAnalyze hello'
  };
  res.json(responseData);
});


module.exports = router;
