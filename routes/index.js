var express = require('express');
var router = express.Router();
var urlshort = require('../model/userSchema');

/* GET home page. */
router.get('/ok/:email', async function (req, res, next) {
  const { email } = req.params;
  const ur = await urlshort.findOne({ email: email });
  if (ur) {
    return res.status(200).json(ur)
  } else {
    return res.status(400).json('error')
  }
});

module.exports = router;
