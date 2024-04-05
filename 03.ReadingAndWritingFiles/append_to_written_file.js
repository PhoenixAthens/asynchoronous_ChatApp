const fs = require('fs');
const data = {
    "name":"Tim",
    "Occupation":"Doctor"
};
fs.appendFile('./demo_2.json',JSON.stringify(data),()=>{
    console.log("Text Appended to File!");
});
