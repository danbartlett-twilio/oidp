/*

  return-all-functions.js

  Get all of the functions in the current service

*/

// ADD twilio-service-helper
const tsh = require(Runtime.getAssets()['/twilio-service-helper.js'].path);

exports.handler = async function(context, event, callback) {
    
  // The Twilio node Client library 
  const client = context.getTwilioClient();

  const environment = await tsh.getCurrentEnvironment(client, context.DOMAIN_NAME,);
  
  const build = await tsh.getLastBuild(client, environment);
    
  // This will end the function!
  return callback(null, build.functionVersions);
  
  
};