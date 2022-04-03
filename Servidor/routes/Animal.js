const express = require("express");
const router = express.Router();
const Animal = require('../models/Animal');

router.get("/:AnimalId",(req, res)=>{
    const IdAnimal = parseInt(req.params.AnimalId);
    Animal.findByPk(IdAnimal).then((ResultadoConsulta)=>{
        if(!ResultadoConsulta || !ResultadoConsulta.dataValues.Disponivel){
            res.render('NotFound', {layout: false});
        }
        if(req.query.device=="Mobile"){
            res.json(ResultadoConsulta.dataValues);
        } else{
            res.render("Animal", ResultadoConsulta.dataValues);
        }
    }).catch((e)=>{
        console.log(e);
        res.render('NotFound', {layout: false});
    });
});

module.exports = router