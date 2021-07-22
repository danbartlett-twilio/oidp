/*

  register-phone-numbers.js

  Accepts POST to add record to CUSTOMERS table
  and then send SMS to phone number

*/

const airtable = require("airtable");

exports.handler = function (context, event, callback) {

  console.log("event in post is ==> ", event);

  const base = new airtable({apiKey: context['DATA-AIRTABLE_API_KEY']}).base(context['DATA-AIRTABLE_BASE_ID']);
  
  let createObj = {};
  [createObj['ContactID']] = [event.phoneNumber]; 
  [createObj['Name']] = [event.name]; 
  [createObj['Created']] = [Date.now()]; 

  console.log("createObj ==> ", createObj);
  
  new Promise(function(resolve,reject) {

    base('CUSTOMERS').create(createObj, 
      (error, record) => {
      if (error) {
        console.error(error);
        reject(false);
        throw error;
      } else {
        console.log("created record... ");
        resolve(record);
      }  
    })
  
  }).then((record) => {    

    console.log("record is  ==> ", record);

    const client = context.getTwilioClient();
    
    client.messages
        .create({
          from: context['NUMBER-PRIMARY'],
          to: event.phoneNumber,
          body: "Thank you for signing up for the Twilio demo! Reply OK to continue!",
        })
        .then((msg) => {
            return callback(null, "Message sent!");        
        })
        .catch((err) => {
          return { success: false, error: err.message };
        });

  });
  
};