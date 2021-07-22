/*

  twilio-studio-helper.private.js

    Helper functions used when deploying new studio flow

*/

/*
    substituteVariable

    Function to asynchronously run a regex on a string

    parameters:
        flow, variable, value

    returns:
        Updated string
*/
exports.substituteVariable = async (flow, variable, value) => {    
    
    return flow.replace(new RegExp(variable,"g"), value);

}

/*
    getFunctionSubstitutePatterns

    Pulls all functions in services and adds them to an iterable array.

    parameters:
        functions

    returns:
        sPatterns: array of functions with path and sid values
*/

exports.getFunctionSubstitutePatterns = async (functions) => {    
    
    sPatterns = [];

    functions.forEach(element => {
        let f = {
            "path":element.path,
            "function_sid":element.function_sid
        };
        sPatterns.push(f);
    });

    return sPatterns;

}
