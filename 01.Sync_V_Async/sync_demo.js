fs = require('fs');
data = fs.readdirSync('/Users/anmolkhanna/Downloads/');
console.log("Date:\n",data);
console.log("I come after listing the directory data!");