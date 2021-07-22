/*

  deploy-studio-flow.js

  Pulls in functions, environment variables, and studio.private.json
  => Updates studio.private.json with service details and
  then deploys the flow
  => Lastly, update environment variables for flow & webhook

*/

// ADD twilio-service-helper
const assets = Runtime.getAssets();

console.log("assets ares ===> ", assets);

const tsh = require(assets['/twilio-service-helper.js'].path);
const sh = require(assets['/twilio-studio-helper.js'].path);

exports.handler = async function(context, event, callback) {
    
    console.log("in deploy-studio-flow...");

    var fs = require('fs');
   
    // Get the path to the json for the Studio Flow stored in the assets directory
    const studioJsonPath = assets["/studio.json"].path;
    
    console.log("studioJsonPath...", studioJsonPath);

    // Read in the json for the Studio Flow
    let flowDefinition = fs.readFileSync(studioJsonPath, 'utf8');
  
    // The Twilio node Client library 
    const client = context.getTwilioClient();
  
    // Get current environment settingd
    const environment = await tsh.getCurrentEnvironment(client, context.DOMAIN_NAME,);

    // Update the service SID, environment SID and Domain Name for the Flow    
    flowDefinition = await sh.substituteVariable(flowDefinition, '<SERVICE_SID>', environment.serviceSid);
    flowDefinition = await sh.substituteVariable(flowDefinition, '<ENVIRONMENT_SID>', environment.sid);
    flowDefinition = await sh.substituteVariable(flowDefinition, '<URL_PREFIX>', context.DOMAIN_NAME);

    // Get the lastest build for this service
    const build = await tsh.getLastBuild(client, environment);
    
    // Extract functions in this service into an interable array
    const functions = await sh.getFunctionSubstitutePatterns(build.functionVersions)
    
    // Loop through the array of function to update the Flow with path and function SIDs
    for (const f of functions) {
        console.log("f ==> ", f);
        console.log("f.path ==> ", f.path);
        console.log("f.function_sid ==> ", f.function_sid);
        let t = "<FUNCTION_SID>"+f.path;
        flowDefinition = await sh.substituteVariable(flowDefinition, t, f.function_sid);
    };

    console.log("flowDefinition ==> ", flowDefinition);

    // Function to deploy new Twilio Studio Flow using updated flowDefinition
    function deployStudio() {
      return client.studio.flows
        .create({
        friendlyName: context['FLOW-PRIMARY_FRIENDLY_NAME'],
        status: 'published',
        definition: flowDefinition,
        })
        .then((flow) => flow)
        .catch((err) => {
        console.log(err.details);
        throw new Error(err.details)
        });
    }

    const flow = await deployStudio(flowDefinition);
    
    console.log('Studio delployed: ' + flow.sid);

    let targetVariable = await tsh.getTargetVariable(client, environment, "FLOW-PRIMARY_SID");
    await tsh.updateEnvironmentVariable(client, environment, targetVariable, "FLOW-PRIMARY_SID", flow.sid);    
    
    targetVariable = await tsh.getTargetVariable(client, environment, "FLOW-PRIMARY_WEBHOOK_CFG");
    await tsh.updateEnvironmentVariable(client, environment, targetVariable, "FLOW-PRIMARY_WEBHOOK_CFG", flow.webhookUrl);    

    // This will end the function!
    return callback(null, 'Setup successfully ran! ==> ', flow.sid);

}