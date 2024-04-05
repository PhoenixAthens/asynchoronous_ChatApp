fs = require('fs');
function phoneNumber(err, data){
    console.log('Data: \n',data);
}
fs.readdir('/Users/anmolkhanna/Downloads/',phoneNumber);
console.log("I come after listing the directory data!, OR DO I?");