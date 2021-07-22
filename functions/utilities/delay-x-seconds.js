/*

  delay-x-seconds.js

  Pass in number of seconds to delay. Used for pauses in Studio Flows

*/

exports.handler = function(context, event, callback) {
    
    let d = event.seconds ? parseInt(event.seconds) * 1000 : 3000;
        
    console.log("Function delay seconds: ", d);

    setTimeout(function() {          
      callback(null, `Delay of ${d} seconds completed.`);
    }, d)

  }