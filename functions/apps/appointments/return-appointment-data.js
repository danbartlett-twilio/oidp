/*

    return-appointment-change-option.js

  Dummy data generate fake appointments when user access the
  appointment app.

*/

exports.handler = async function(context, event, callback) {
    
  const days = ["Today","Tomorrow"];
  const times = ["8:00 AM","9:00 AM","9:30 AM","10:00 AM", "11:00 AM", "1:30 PM", "2:00 PM"];    
  
  return callback(null, {day:days[Math.floor(Math.random()*days.length)],time:times[Math.floor(Math.random()*times.length)]});
  
};