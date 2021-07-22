/*

  get-records.js

  Retrieves multiple records from a table. Optional to add number of returns to
  return plus, sort field and direction.

  Pulls AIRTABLE_API_KEY and AIRTABLE_BASE_ID from context

  Required Paramaters: 
    * event.targetTable

  Optional Parameters: 
    * event.numberRecords  
    * event.sortField
    * event.sortDirection

*/

const airtable = require("airtable");

exports.handler = function (context, event, callback) {

  const base = new airtable({apiKey: context['DATA-AIRTABLE_API_KEY']}).base(context['DATA-AIRTABLE_BASE_ID']);
  
  let numberRecords = event.numberRecords ? parseInt(event.numberRecords) : 5;
  let doSort =  event.sortField ? true : false; 
  let sortDirection =  event.sortDirection ? event.sortDirection : 'asc'; 

  console.log("event is ==> ", event);
  console.log("doSort is ==> ", doSort);
  console.log("sortDirection is ==> ", sortDirection);
  console.log("numberRecords is ==> ", numberRecords);

  base(event.targetTable).select({       
      maxRecords: numberRecords,
      ...( doSort && { sort: [ {field: event.sortField, direction: sortDirection} ] } )      
  }).firstPage(function (err, records)
      {
        if(err) {
            console.log(err);
            callback("error retrieving record",null);
        }
        console.log("records is ==> ", records);
        callback(null, {records});         
      }
  );
  
};
