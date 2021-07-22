/*

  get-customers.js

  Retrieves records from specific CUSTOMERS table.

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

  base("CUSTOMERS").select({       
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