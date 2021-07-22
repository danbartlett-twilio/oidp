/*

  delete-record-by-id.js

  deletes a single record in a table.
  
  Pulls AIRTABLE_API_KEY and AIRTABLE_BASE_ID from context

  Required Paramaters: 
    * event.targetRecordId

*/

const airtable = require("airtable");

exports.handler = function (context, event, callback) {

  const base = new airtable({apiKey: context['DATA-AIRTABLE_API_KEY']}).base(context['DATA-AIRTABLE_BASE_ID']);
  
  console.log("event is ==> ", event);

  base(event.targetTable).destroy(event.targetRecordId, function(err, deletedRecord) {
    if (err) { console.error(err); return; }
    callback(null, deletedRecord); 
    console.log('Deleted record', deletedRecord.id);
  });
  
};
