// // ----------------Create As server------------------------
// let http  = require("http");

// let hostname = "127.0.0.1";
// let port = 3000;

// let server = http.createServer((req,res)=>{
//     // res.statusCode = 200;
//     // res.setHeader("content-Type","text/plain");
//     res.end("Hello World");
// }).listen(3000)

// // server.listen(port,hostname,()=>{
// //     console.log(`Server Running at http://${hostname}:${port}/`);
// // });

// -----------------------Events Emmiter---------------------
const EventsEmitter = require("events");
const emitter = new EventsEmitter();

// Register A listener
emitter.on("logging",arg=>{
    console.log(arg);
})
// Raise An event
emitter.emit("logging",{data :"mesage"});