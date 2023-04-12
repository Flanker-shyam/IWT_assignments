const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

const logRequests = (req,res, next)=>{
    console.log(`request method: ${req.method} and Request url is: ${req.url}`);
    next();
}
app.use(logRequests);

app.get("/",(req,res)=>{
    res.send("Welcome to Flanker's space");
})

app.get("/info",(req,res)=>{
    res.send("My name is Flanker");
})

app.get("/name",(req,res)=>{
    res.send(`Tell me your name: 
    <form method="POST" action="/login">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name"><br>
    <button type="submit">done</button>
  </form>`)
})
app.post("/info",(req,res)=>{
    const {name} = req.body;
    res.send(`Hey,${name}`);
})

app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("listening on port: 3000");
    }
})