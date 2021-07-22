/*

  update-variable.js

  Update an environment variable

*/

const tsh = require(Runtime.getAssets()['/twilio-service-helper.js'].path);

exports.handler = async function(context, event, callback) {

    // The Twilio node Client library 
    const client = context.getTwilioClient();

    const environment = await tsh.getCurrentEnvironment(client, context.DOMAIN_NAME,);
    
    const targetVariable = await tsh.getTargetVariable(client, environment,event.TARGET_KEY);
    
    await tsh.updateEnvironmentVariable(client, environment, targetVariable, event.TARGET_KEY, event.NEW_VALUE);    
  
    // This will end the function!
    return callback(null, `Updated this variable: ${event.TARGET_KEY} to ${event.NEW_VALUE}!`);  
  
  };