const data = require("./data_prep.js");
var express = require("express"); 
var app = express();

var path = require("path"); 
const { response } = require("express");
const { callbackify } = require("util");

var HTTP_PORT = process.env.PORT || 8080;  


function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"))
});

app.get("/cpa", function(req, res){
    data.cpa().then(value => 
        res.json(value)).catch((err)=>res.json(err));
});

app.get('/highGPA', (req, res)=>{
   res.sendFile(path.join(__dirname, '/views/highGPA.html'))
})


app.use((req, res, next)=>{
    res.status(404).send('Page Not Found!');
})

data.prep().then(app.listen(HTTP_PORT, onHttpStart)).catch(()=>{console.log("Nope")});