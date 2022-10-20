// URL: https://kind-cyan-lion-suit.cyclic.app/

const data = require("./data_prep.js");
var express = require("express"); 
var app = express();

var path = require("path"); 
const { response } = require("express");
const { callbackify } = require("util");
const { request } = require("http");
app.use(express.json());
app.use(express.urlencoded({extended: true}))

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
});


app.get("/allStudents", function(req, res){
    data.getAllStudents().then(value => 
        res.json(value)).catch((err)=>res.json(err));
});

app.get("/addStudent", (req, res)=>{
    res.sendFile(path.join(__dirname, '/test3_views/addStudent.html'))
});


app.post("/addStudent", (req, res)=>{
    const formData = req.body;
    const dataReceived =  "<p>Your Student Id is: " + req.body.id + "</p>" + "Your name is: "
    + req.body.name + "<p> Program: " + req.body.program + "<p> GPA: "+ "</p>" +"</p> <br>"
    res.send(dataReceived);
    });

app.get('/student/:studId', function(request, res){
    console.log(request.params);
    res.json(request.params);
    
});


app.use((req, res, next)=>{
    res.status(404).send('Page Not Found!');
});


data.prep().then(app.listen(HTTP_PORT, onHttpStart)).catch(()=>{console.log("Nope")});