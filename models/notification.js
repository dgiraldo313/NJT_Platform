// use Bandwidth instead of twilio
const Bandwidth = require("node-bandwidth");


// this function will use Bandwidth API to send SMS to users that need to be modified
//create a function to send reminder via Bandwidth
function send(notice){
  const client = new Bandwidth({
      userId    : process.env.bandwidth_user_id,
      apiToken  : process.env.bandwidth_api_token,
      apiSecret : process.env.bandwidth_api_secret
    });
    console.log('Using Bandwidth to send SMS');

    const options = {
        from: process.env.bandwidth_phone_number,
        to: process.env.myPhoneNumber,
        text: "PLATFORM #: " +
              notice.platform +
              "\nTRAIN #: " +
              notice.train +
              "\nDEPT. TIME:" +
              notice.dep_time +
              "\nLINE:" +
              notice.line,
    };

  // Send the message!
  client.Message.send(options, function(err, response) {
      if (err) {
          // log error
          console.error(err);
      } else {
          // Log the last few digits of a phone number
          console.log('Message sent to ' + options.to );
      }
  });
}


module.exports.send = send;
