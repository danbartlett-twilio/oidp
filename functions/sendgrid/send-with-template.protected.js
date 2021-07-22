/*

  send-with-template.protected.js

  Used to send email usingn a template via sendgrid api

*/

const sgMail = require('@sendgrid/mail')

exports.handler = function (context, event, callback) {

  console.log("event in post is ==> ", event);
  
  sgMail.setApiKey(context.SENDGRID_API_KEY);

  let fieldNames = event.fieldNames.split('|');
  let fieldValues = event.fieldValues.split('|');  
  let items = [];
  for(let i=0;i<fieldNames.length;i++) {
    items.push( {"name": fieldNames[i], "value": fieldValues[i]});
  }  

  const msg = {
    to: event.TO_EMAIL,
    from: context.SENDGRID_VERIFIED_SENDER,
    dynamic_template_data: {
        guest: fieldValues[fieldNames.indexOf('Name')],
        items: items
      },
      template_id: context.SENDGRID_TEMPLATE_ID
    };

  console.log("msg => ", msg);
    
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
    callback(null, "Email Sent!");
  })
  .catch((error) => {    
    console.error(error)
    callback(null, "Email NOT Sent!");
  });    

};