/*

  update-record.js

  Updates a single record in a table. Fields names, field values, fie to update are passed
  in

  Pulls AIRTABLE_API_KEY and AIRTABLE_BASE_ID from context

  Required Paramaters: 
    * event.targetTable
    * event.record_id  
    * event.fieldNames
    * event.fieldValues
    * event.fieldTypes

*/

const airtable = require("airtable");
exports.handler = function (context, event, callback) {

  const base = new airtable({apiKey: context['DATA-AIRTABLE_API_KEY']}).base(context['DATA-AIRTABLE_BASE_ID']);
  
  console.log("Event is ==> ", event);
  
  let targetTable = event.targetTable;

  let record_id = event.record_id;

  let fieldNames = event.fieldNames.split('|');
  let fieldValues = event.fieldValues.split('|');  
  let fieldTypes = event.fieldTypes.split('|');    
  
  let updateObj = {};
  for(let i=0;i<fieldNames.length;i++) {
    
    let v = fieldValues[i];
    
    // console.log("Event is ==> ", event);
    // console.log("fieldTypes[i] ", fieldTypes[i]);     

    if (event.fieldTypes && fieldTypes[i] !== 'string') {
      switch(fieldTypes[i]) {
        case ('integer'):
          [updateObj[fieldNames[i]]] = [parseInt(v)]; 
          break;
        case ('boolean'):
          [updateObj[fieldNames[i]]] = [(v.toLowerCase() === 'true')]; 
          break;
        case ('float'):
          [createObj[fieldNames[i]]] = [parseFloat(v)]; 
          break;                              
        }
    } else {
      [updateObj[fieldNames[i]]] = [v];  
    }

  } 
   
  // console.log("updateObj is ==> ", updateObj);   
   
   base(targetTable).update(
    record_id,
    updateObj,
    (error, record_id) => {
      if (error) {
        console.error(error, record_id);
        throw error;
      } else {
        callback(null, "Success!");
        }
    });
}