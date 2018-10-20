const njt_data = require("../models/njt_data.js");
const notification = require("../models/notification");
const cron = require("../models/cron");

let min_counter = 0;
// Parse data and return track

function get() {
  return njt_data.get()
                 .then((data) => {
                   // option to choose line for scalability
                   const line = 'Morristown Line';
                   const line_info = findLine(data, line);
                  //temp test data
                   const platform = line_info.trk;

                   if ( platform !== '0' ) {
                     // trigger send message
                     const notification_info = {
                                      platform : platform,
                                      train: line_info.train,
                                      dep_time : line_info.departs,
                                      line: line_info.line,
                                    };
                    notification.send(notification_info);
                    cron.noticeReminder.destroy();
                    return true;
                   } else {
                     //trigger cron job
                     if ( min_counter <= 15 ) {
                       min_counter++;
                       cron.noticeReminder.start();
                     } else {
                       cron.noticeReminder.destroy();
                     }
                     return false;
                   }
                 });
}

function findLine( data, line) {
  let lines_found = [];
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
