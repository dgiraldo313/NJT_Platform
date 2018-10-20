const cron = require('node-cron');
const notification = require("../models/notification");
const platform = require("../models/platform");

const task = cron.schedule('* * * * *', function() {
  console.log('Cron in progress');
  platform.get();
}, false);

module.exports.noticeReminder = task;
