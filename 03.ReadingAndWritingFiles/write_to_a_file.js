const fs = require('fs');
const data = {
    "name":"Jacob",
    "occupation":"sysmon"
}
fs.writeFile('./demo_2.json',JSON.stringify(data),()=>{
  console.log("Text added to file!");
});
