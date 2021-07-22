/*

  create-record.js

  Creates single record in a table.

  Pulls AIRTABLE_API_KEY and AIRTABLE_BASE_ID from context

  Required Paramaters: 
    * event.targetTable
    * event.fieldNames
    * event.fieldValues
    * event.fieldTypes

*/

const airtable = require("airtable");
exports.handler = function (context, event, callback) {

  const base = new airtable({apiKey: context['DATA-AIRTABLE_API_KEY']}).base(context['DATA-AIRTABLE_BASE_ID']);

  console.log("Event is ==> ", event);
  
  let targetTable = event.targetTable;
  
  let fieldNames = event.fieldNames.split('|');
  let fieldValues = event.fieldValues.split('|');  
  let fieldTypes = event.fieldTypes.split('|');  
  
  let createObj = {};
  for(let i=0;i<fieldNames.length;i++) {
    
    let v = fieldValues[i];
    
    console.log("Event is ==> ", event);
    console.log("fieldTypes[i] ", fieldTypes[i]);  
    
    if (event.fieldTypes && fieldTypes[i] !== 'string') {
      switch(fieldTypes[i]) {
        case ('integer'):
          [createObj[fieldNames[i]]] = [parseInt(v)]; 
          break;
        case ('boolean'):
          [createObj[fieldNames[i]]] = [(v.toLowerCase() === 'true')]; 
          break; 
        case ('float'):
          [createObj[fieldNames[i]]] = [parseFloat(v)]; 
          break;                    
      }
    } else {
      [createObj[fieldNames[i]]] = [v];  
    }
    
  } 
  
   base(targetTable).create(createObj, 
      (error, record) => {
      if (error) {
        console.error(error);
        throw error;
      } else {
        console.log("Record is ==> ", record);
        callback(null, record);
        }
    });
}