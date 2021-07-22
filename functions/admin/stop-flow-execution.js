/*

  stop-flow-execution.js

  Stops an active studio execution

*/


exports.handler = function (context, event, callback) {

    // The Twilio node Client library 
    const client = context.getTwilioClient();

    console.log("event is ==> ", event);

    try {
        
        client.studio.flows(context['FLOW-PRIMARY_SID'])
            .executions(event.executionSID)
            .update({status: 'ended'})
            .then(
                (execution) => {                                    
                    callback(null, "execution stopped!");     
                } 
            );

    } catch (err) {
        console.log(`Error stopping execution ${err}`);
        return false;
    }

}