const http = require('http');

function get() {
  return new Promise(function (resolve, reject) {
    const options = {
      hostname: 'cs.drew.edu',
      port: 80,
      path: '/~cthurber/wtrs/data/current_listings.json',
      method: 'GET',
    };

    // make request
    const request = http.request(options, (response) => {
      let body = '';

      response.on('data', (data) => {
        body += data;
      });
      // Add parsed info once request is complete
      response.on('end', () =>{
        if(response.statusCode === 200){
          //use try and catch for error
          try {
            //return to callback
            resolve(JSON.parse(body));
          }catch(error){
            reject(error);
          }
        }else{
          // status error
          reject({message: response.statusMessage });
        }
      });
    })
    request.end();

    //error handling
    request.on('error', (error) => {
      console.error('something went wrong: ' + error);
      reject(error);
    });
  });

}

// create modules
module.exports.get = get;
