const express = require("express");
const router = express.Router();
const Loja = require('../models/Loja');

router.get("/:LojaId",function(req, res){
    const LojaId = parseInt(req.params.LojaId);
    Loja.findByPk(LojaId).then((ResultadoConsulta)=>{
    if(req.query.device=="Mobile"){
            res.json(ResultadoConsulta.dataValues);
        } else{
            res.render("Loja", ResultadoConsulta.dataValues);
        }
    }).catch(()=>{
        res.render('NotFound', {layout: false});
    });
});

module.exports = router