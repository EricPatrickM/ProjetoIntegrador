const express = require("express");
const { engine } = require('express-handlebars');
const app = express();
const port = 8001;

//Template
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.get("/", function(req, res){

});

function DataBaseGetUserInfo(ide){//aqui eu consulto o banco e retorno os valores
    return {id:ide, age:25, name:"eric"}
}

function DataBaseGetAnimalInfo(ide){
    return {id:ide, age:25, name:"eric"}
}

function DataBaseGetStoreInfo(ide){
    return {id:ide, age:25, name:"eric"}
}


//LOGIN



//CLIENTE
app.get("/ClientUserLayout/:UserId",function(req, res){
    res.render("Client", DataBaseGetUserInfo(req.params.UserId));
});

app.get("/ClientUserInfo/:UserId",function(req, res){
    res.json(DataBaseGetUserInfo(req.params.UserId));
});

app.post("/RegisterUser", function(req, res){

});

app.post("/ModifyUser",function(req, res){

});





//ANIMAL
app.get("/AnimalUserLayout/:AnimalId",function(req, res){
    res.render("Client", DataBaseGetAnimalInfo(req.params.AnimalId));
});

app.get("/AnimalUserInfo/:AnimalId",function(req, res){
    res.json(DataBaseGetAnimalInfo(req.params.AnimalId));
});




//store
app.get("/StorageUserLayout/:StoreId",function(req, res){
    res.render("StoreId", DataBaseGetStoreInfo(req.params.StoreId));
});

app.get("/StorageUserInfo/:StoreId",function(req, res){
    res.json(DataBaseGetStoreInfo(req.params.StoreId));
});

app.listen(port, ()=>{
    
});