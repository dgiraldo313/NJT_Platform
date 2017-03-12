var cron = require('node-cron');
var notification = require("../models/notification");
// var moment = require('moment');

var task = cron.schedule('* * * * *', function() {
  console.log('immediately started');
}, false);

module.exports.noticeReminder = task;
