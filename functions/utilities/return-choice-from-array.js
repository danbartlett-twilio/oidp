/*

  return-choice-from-array.js

  This is hard to do in Studio so pass in an array
  and an index and return the desired value

*/

exports.handler = function (context, event, callback) {

    console.log("event is ==> ", event);

    let selectedIndex = parseInt(event.ChoiceIndex)-1;
    let arrayData = JSON.parse(event.ArrayData);    
    let selected = arrayData[event.ArrayName][selectedIndex];    

    console.log("selected is ==> ", selected);
    
    callback(null, selected);
  
  }


