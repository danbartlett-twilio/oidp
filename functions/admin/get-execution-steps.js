/*

  get-execution-step.js

  Retrieves steps for a specific execution.

*/


exports.handler = function (context, event, callback) {

    // The Twilio node Client library 
    const client = context.getTwilioClient();

    console.log("event is ==> ", event);

    try {
        
        client.studio.flows(context['FLOW-PRIMARY_SID'])
            .executions(event.executionSID)
            .executionContext()
            .fetch()
            .then(
                (execution_context) => {                
                    console.log("returned context is ==> ",execution_context.context);
                    callback(null, execution_context);     
                } 
            );

    } catch (err) {
        console.error(`Error creating '${key}' with '${value}': ${err}`);
        return false;
    }

}