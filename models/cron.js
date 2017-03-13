var cron = require('node-cron');
var notification = require("../models/notification");
var platform = require("../models/platform");
// var moment = require('moment');

var task = cron.schedule('* * * * *', function() {
  console.log('Cron in progress');
  platform.get();
}, false);

module.exports.noticeReminder = task;
