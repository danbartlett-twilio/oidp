/*

  return-all-variables.js

  Retrun all system varialbles

*/

// ADD twilio-service-helper
const tsh = require(Runtime.getAssets()['/twilio-service-helper.js'].path);

exports.handler = async function(context, event, callback) {
    
  // The Twilio node Client library 
  const client = context.getTwilioClient();

  const environment = await tsh.getCurrentEnvironment(client, context.DOMAIN_NAME,);
  
  const variables = await tsh.getAllVariables(client, environment);
    

  if (event.fromStudio === 'YES') {
    let v = {};
    for(let i=0;i<variables.length;i++){
      v[variables[i].key] = variables[i].value
      if (i === variables.length-1) {
        return callback(null, v);
      }
    }
    
  } else {
    return callback(null, variables.sort((a, b) => (a.key > b.key) ? 1 : -1));
  }
  
  

};