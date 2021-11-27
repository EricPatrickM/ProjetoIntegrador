const express = require("express");
const app = express();
const port = 8001;

app.get("/", function(req, res){

});

app.get("/ClientUserLayout/:UserId",function(req, res){
    res.sendFile(__dirname + "/teste.html");
});

app.get("/ClientUserInfo",function(req, res){
    res.send("teste");
});

app.listen(port, ()=>{
    console.log(__dirname);
});