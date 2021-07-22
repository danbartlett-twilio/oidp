/*

  send.protected.js

  Used to send SMS

*/

exports.handler = function (context, event, callback) {
    
    const client = context.getTwilioClient();
    
    client.messages
        .create({
          from: context.SENDER,
          to: event.TO_NUMBER,
          body: event.MESSAGE_BODY,
        })
        .then((msg) => {
            return callback(null, "Message sent!");        
        })
        .catch((err) => {
          return { success: false, error: err.message };
        });

};