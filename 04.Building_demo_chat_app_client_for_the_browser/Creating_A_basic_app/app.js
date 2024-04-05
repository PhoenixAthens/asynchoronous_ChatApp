const express = require('express');
const startExpress = express();
startExpress.use(express.static(__dirname));
const server = startExpress.listen(3000,()=>{
    console.log("Server started at ",server.address().port);
})
