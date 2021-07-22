/*

  set-sms-number-webhook.js

  Set the Incomming Messages wehbook for passed in Phone Number

*/

// ADD twilio-service-helper
const assets = Runtime.getAssets();

console.log("assets ares ===> ", assets);

const tsh = require(assets['/twilio-service-helper.js'].path);

exports.handler = async function(context, event, callback) {

    // The Twilio node Client library 
    const client = context.getTwilioClient();

    // Get the SID of the number previously specified in the ENV
    function getPhoneNumberSid() {
        return new Promise((resolve, reject) => {
        client.incomingPhoneNumbers
            .list({
            phoneNumber: context['NUMBER-PRIMARY'],
            limit: 1
            })
            .then((incomingPhoneNumbers) => {
            const n = incomingPhoneNumbers[0];
            resolve(n.sid);
            })
            .catch((err) => reject(err));
        });
    }

    // Using the number's SID, update it's webhook to the Studio Flow
    function updatePhoneNumberWebhook(webhook, numberSid) {
        return new Promise((resolve, reject) => {
        client.incomingPhoneNumbers(numberSid)
            .update({
            smsUrl: webhook,
            })
            .then(() => {
            resolve('success');
            })
            .catch((err) => reject(err));
        });
    }  

    const phoneNumberSid = await getPhoneNumberSid();
    await updatePhoneNumberWebhook(context['FLOW-PRIMARY_WEBHOOK_CFG'], phoneNumberSid);
    console.log('Phone number sid updated: ' + phoneNumberSid);
    
    // Get current environment settingd
    const environment = await tsh.getCurrentEnvironment(client, context.DOMAIN_NAME,);
        
    const targetVariable = await tsh.getTargetVariable(client, environment, "NUMBER-WEBHOOK_CFG");
    await tsh.updateEnvironmentVariable(client, environment, targetVariable, "NUMBER-WEBHOOK_CFG", context['FLOW-PRIMARY_WEBHOOK_CFG']);

    // This will end the function!
    return callback(null, 'Successfully updated phone number webook! ==> ');

}