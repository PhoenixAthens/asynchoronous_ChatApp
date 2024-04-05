const express =require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose  = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const dbURL= "mongodb+srv://anmolkhanna2003:kRtSdtTD9vqJalwb@cluster0.6sia6zj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let Message = mongoose.model("Message",{
    name:String,
    message:String
});

//here we are creating a endpoint for handling get requests
//when a get request arrives at 3000/messages, the callback will send the specified response!
app.get('/messages',(req,res)=>{
    Message.find({}).then(message=>{
        res.send(message);
    }).catch(err=>{
        console.log("Error detected!");
    })

});
app.get("/messages/:user",(req,res)=>{
    let user = req.params.user;
    Message.find({name:user}).then(message=>{
        res.send(message);
    }).catch(err=>{
        console.log("Error detected!");
    })
});
// app.post('/messages',(req,res)=>{
//     let message = new Message(req.body);
//     message.save().then(()=>{
//             Message.findOne({message:"badword"}).then((censor)=>{
//                 if(censor){
//                     console.log("Obscenity detected!\n ",censor);
//                     Message.deleteOne({_id:censor._id}).then(()=>{
//                         console.log("Obscenity Purged!");
//                     })
//                 }else{
//                     io.emit("message", req.body);
//                 }
//
//             })
//
//         }
//     )
//
// });

//implementing the `app.post function properly using promises
app.post('/messages',(req,res)=>{
    let message = new Message(req.body);
    message.save()
        .then(()=>{
            console.log('saved')
            return Message.findOne({message:'badword'});
        })
        .then(censor=>{
            if(censor){
                console.log("Obscenity detected! ",censor);
                return Message.deleteOne({_id:censor._id});
            }
            io.emit('message',req.body);
            res.sendStatus(200);
        })
        .catch((err)=>{
            res.sendStatus(500);
            console.log("Error detected!");
        });
});

//implementing the `app.post` function using async/await (ERROR IN CODE)
/*app.post('/messages',async (req,res)=>{
    let message = new Message(req.body);
    let savedMessage = await message.save();
    console.log("SAVED!");
    let censoredWord = await Message.findOne({message:'badword'});
    if(censoredWord){
        await Message.deleteOne({_id:censoredWord._id});
    }else{
        await io.emit('message',req.body);
    }
    res.sendStatus(200);
})*/

io.on('connection',(socket)=>{
    console.log("a user connected!");
});

mongoose.connect(dbURL).then((err)=>{
    console.log("a mongo user connected!");
});

//The syntax below, doesn't work any more!
// mongoose.connect(dbURL,{useMongoClient:true},(err)=>{
//     console.log('a user connected to mongo!');
// });
const server = http.listen(3000,()=>{
    console.log("Server started at ",server.address().port);
});
