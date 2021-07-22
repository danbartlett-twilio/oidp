/*

  return-appointment-change-option.js

  Returns dummy demo data to provide alternative times for appointment app

*/

exports.handler = async function(context, event, callback) {
    
    const times = ["8:15 AM","9:45 AM","10:20 AM", "2:45 PM", "4:30 PM"];    
    
    return callback(null, {times:times});
    
  };