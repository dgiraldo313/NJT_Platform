var express = require('express');
var router = express.Router();
var platform = require("../models/platform.js");

/* GET request sent by url. */
router.get('/get_platform', function (req, res, next) {
  // var teamID = req.params.id;
  platform.get()
          .then((val) => {
            res.json( {'success': val });
            // retry request again after a minute
            // if (!val) {
            //   setTimeout(function () {
            //       platform.get();
            //   }, 3000);
            // }
          });

  console.log('This is working');
});

module.exports = router;
