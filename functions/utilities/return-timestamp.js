/*

  return-timestamp.js

  Returns a unix timestamp from current time.

*/

exports.handler = function (context, event, callback) {
    
    callback(null, Date.now());
  
  }