var njt_data = require("../models/njt_data.js");
var notification = require("../models/notification");
var cron = require("../models/cron");
// Parse data and return track

function get() {
  return njt_data.get()
                 .then((data) => {
                   // option to choose line for scalability
                   var line = 'Morristown Line';
                  //  var line_info = findLine(data, line);
                  //temp test data
                   var line_info = { to: 'Dover-SEC',
                                     line: 'Morristown Line',
                                     predicted: 0,
                                     train: '6627',
                                     confidence: 16.666666666666664,
                                     departs: '12:46',
                                     trk: '0',
                                    created: '2017-02-22_12:05:54' };
                  var platform = line_info.trk;

                   if ( platform !== '0' ) {
                     // trigger send message
                     var notification_info = {
                                      platform : platform,
                                      train: line_info.train,
                                      dep_time : line_info.departs,
                                      line: line_info.line,
                                    };
                    notification.send(notification_info);
                    cron.noticeReminder.stop();
                     return true;
                   } else {
                     //trigger cron job
                     cron.noticeReminder.start();
                     return false;
                   }
                 });
}

function findLine( data, line) {
  var lines_found = [];
  data.map((curr_line) => {
    if( curr_line.line === line) {
      lines_found.push(curr_line);
    }
  });
  // only return next scheduled train
  return lines_found[0];
}
// create modules
module.exports.get = get;
