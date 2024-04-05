const fs  = require('fs');

//reading the file directly using require
const data = require("./demo.json");
console.log(data);
console.log(data.name);
console.log(data.strapLength);
console.log(data.strapLength.left,data.strapLength.right);

console.log("=============================================");

fs.readFile('./demo.json','utf-8',(err,data)=>{
    console.log("Data: ",data);
    //to data console logged in statement above is simply text,
    //next, let's parse it
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    console.log(parsedData.name);
    console.log(parsedData.strapLength);

});

//OUTPUT:
// {
//     name: 'Everyday Backpack',
//     volume: 30,
//     color: 'grey',
//     pocketNum: 15,
//     strapLength: { left: 26, right: 26 },
//     lidOpen: false
// }
// Everyday Backpack
// { left: 26, right: 26 }
// 26 26

//=============================================
// Data:  {
//     "name":"Everyday Backpack",
//         "volume": 30,
//         "color":"grey",
//         "pocketNum":15,
//         "strapLength":{
//         "left":26,
//             "right":26
//     },
//     "lidOpen":false
// }
// {
//     name: 'Everyday Backpack',
//         volume: 30,
//     color: 'grey',
//     pocketNum: 15,
//     strapLength: { left: 26, right: 26 },
//     lidOpen: false
// }
// Everyday Backpack
// { left: 26, right: 26 }



