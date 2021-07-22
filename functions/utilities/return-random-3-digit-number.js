exports.handler = function (context, event, callback) {
    
    callback(null, Math.floor(100 + Math.random() * 999));
  
  }
