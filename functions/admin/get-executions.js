/*

  get-executions.js

  Retrieves last 50 executions for a Studio flow

*/


exports.handler = function (context, event, callback) {

    // The Twilio node Client library 
    const client = context.getTwilioClient();

    client.studio.flows(context['FLOW-PRIMARY_SID'])
        .executions
        .list({limit:50})
        .then(
            (executions) => {
                console.log("Number of executions returned => ", executions.length);
                callback(null, executions);     
            } 
        );

}