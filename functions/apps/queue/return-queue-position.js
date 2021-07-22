/*

  return-queue-position.js

  Pulls records from the queue table and finds the index of the
  passed in record to determine the current position in the queue.

*/

const airtable = require("airtable");

exports.handler = function (context, event, callback) {

  const base = new airtable({apiKey: context['DATA-AIRTABLE_API_KEY']}).base(context['DATA-AIRTABLE_BASE_ID']);
  
  let numberRecords = event.numberRecords ? parseInt(event.numberRecords) : 5;
  let doSort =  event.sortField ? true : false; 
  let sortDirection =  event.sortDirection ? event.sortDirection : 'asc'; 

  console.log("in return-queue-position and event is ==> ", event);
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

        let i = records.findIndex(r => r.id === event.record_id);
        console.log("i is ==> ", i );
        callback(null, i+1 );

      }
  );
  
};
