const express = require("express");
const router = express.Router();

//Recursos utilizados pelo site, como imagens e estilos

router.get("/Images/Logo",function(req, res){
    res.sendFile('C:/Users/Eric/Desktop/Projeto integrador/ProjetoIntegrador/Servidor/views/Images/Logo.svg');
});

router.get("/Images/Loja",function(req, res){
    res.sendFile('C:/Users/Eric/Desktop/Projeto integrador/ProjetoIntegrador/Servidor/views/Images/Loja.png');
});

router.get("/Images/Usuario",function(req, res){
    res.sendFile('C:/Users/Eric/Desktop/Projeto integrador/ProjetoIntegrador/Servidor/views/Images/Usuario.png');
});

router.get("/Images/Cachorro",function(req, res){
    res.sendFile('C:/Users/Eric/Desktop/Projeto integrador/ProjetoIntegrador/Servidor/views/Images/20-204318_dog-outline-png-hunting-dog-transparent-png.png');
});

router.get("/Style/Menu",function(req, res){
    res.sendFile('C:/Users/Eric/Desktop/Projeto integrador/ProjetoIntegrador/Servidor/views/Style/Menu.css');
});

router.get("/Style/NotFound",function(req, res){
    res.sendFile('C:/Users/Eric/Desktop/Projeto integrador/ProjetoIntegrador/Servidor/views/Style/NotFound.css');
});

router.get("/Style/Padrao",function(req, res){
    res.sendFile('C:/Users/Eric/Desktop/Projeto integrador/ProjetoIntegrador/Servidor/views/Style/Padrao.css');
});

module.exports = router