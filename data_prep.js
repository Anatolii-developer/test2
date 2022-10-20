const e = require('express');
const fs = require('fs');
const { resolve } = require('path');


var students = [];



function prep(){
    return new Promise(function(resolve, reject){
        fs.readFile('./student.json', (err,data) =>{
            if (err) reject("Unable to read file");
            students = JSON.parse(data);
        });
        resolve();
    })
}

function cpa(){
    return new Promise(function(resolve, reject){
        if(students.length == 0) reject("No results returned");
        resolve(students);
    })
}

function highGPA(){
    var high = [];
    return new Promise(function(resolve, reject){
        if(students.length == 0) reject ("No results returned");
        for(let i = 0; i < students.length; i++){
            if(students[i].gpa == 3.8){
                high.push(students[i]);
            }
        }
        resolve(high);
    })
}

function getAllStudents(){
return new Promise(function(resolve, reject){
    if(students.length == 0) reject ("No result returned")
    resolve(students);
})
}


function addStudent(){
    return new Promise(function(resolve, reject){
        if(students.length == 0) reject ("No result returned");
        const formData = req.body;
        const dataReceived = "Form data" + JSON.stringify(formData) +"<br>";
        resolve(dataReceived);
    })
}

module.exports = {prep, cpa, highGPA, getAllStudents, addStudent};