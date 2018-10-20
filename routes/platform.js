const express = require('express');
const router = express.Router();
const platform = require("../models/platform.js");

/* GET request sent by url. */
router.get('/get_platform', function (req, res, next) {
  platform.get()
          .then((val) => {
            res.json( {'success': val });
          });

  console.log('This is working');
});

module.exports = router;
