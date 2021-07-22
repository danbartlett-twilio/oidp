/*

  return-basic-math.js

  Returns a value after calculating simple math.
  
  Pulls AIRTABLE_API_KEY and AIRTABLE_BASE_ID from context

  Required Paramaters: 
    * event.n1
    * event.n2
    * event.f (add, subtract, multiply, divide)

*/

exports.handler = function (context, event, callback) {

  console.log("event in return-basic-math ==> ", event);
    
  let n1 = parseInt(event.n1);
  let n2 = parseInt(event.n2);
    
  let r = 0;  
  switch(event.f) {
    case "add":
      r = n1 + n2;
      break;
    case "subtract":
      r = n1 - n2;  
      break;      
    case "multiply":
      r = n1 * n2;            
      break;      
    case "divide":
      r = n1 / n2;            
      break;      
  }
    
  callback(null, r);

}