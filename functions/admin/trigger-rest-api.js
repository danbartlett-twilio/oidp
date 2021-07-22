/*

  trigger-rest-api.js

  Call the REST API for the Studio Flow using the passed number

*/

exports.handler = function (context, event, callback) {

    // The Twilio node Client library 
    const client = context.getTwilioClient();

    client.studio.flows(context['FLOW-PRIMARY_SID'])
        .executions
        .create({to: event.targetNumber, from: context['NUMBER-PRIMARY']})
        .then(
            (execution) => {
                console.log(execution.sid);
                callback(null, execution.sid);     
            } 
        );

}