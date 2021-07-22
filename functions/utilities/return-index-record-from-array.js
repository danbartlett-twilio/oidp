/*

  return-index-record-from-array.js

  It can be hard to work with arrays of data inside Studio. 
  This function returns a item from an array based on the index.
  
  Pulls AIRTABLE_API_KEY and AIRTABLE_BASE_ID from context

  Required Paramaters: 
    * event.records => array of items / objects
    * event.i => the index of the array to return

*/

exports.handler = function (context, event, callback) {

    // console.log("event in return-index-record-from-array is ==> ", event);
      
    let i = parseInt(event.i) - 1;    
    let records = JSON.parse(event.records);  
    
    // console.log("i is ==> ", i);
    // console.log("records is ==> ", records);
      
    callback(null, records.records[i]);
  
  }