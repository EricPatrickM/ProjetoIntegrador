//Esse é o presenter

//EXPRESS
const express = require("express");
const app = express();

//HANDLEBARS
const { engine } = require('express-handlebars');

//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//ROTAS
const Cliente = require('./routes/Cliente');
const Animal = require('./routes/Animal');
const BDAnimal = require('./models/Animal');
const BDAnimalPerdido = require('./models/Perdido');
//const Loja = require('./routes/Loja');
const Resources = require('./routes/Resources');
const Formulario = require('./routes/Formulario');


//SESSION
    const flash = require('connect-flash');
    const passport = require('passport');
    const session = require('express-session');
    require('./config/auth')(passport);

    function authenticationMiddleware(req, res, next){
        if(req.isAuthenticated()) return next();
        res.redirect(req._parsedOriginalUrl.pathname);
    }
//CONFIGURACAO
    //SESSION
        app.use(session({
            secret: 'teste',
            resave: false,
            saveUninitialized: false,
            cookie:{maxAge:3600000}
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
        app.use((req, res, next)=>{
            res.locals.user = req.user || null;
            next();
        })
    //handlebars
        app.use(express.static(__dirname + "/public"))
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        app.engine('handlebars', engine({ 
            extname: '.handlebars', 
            defaultLayout: "main",
            helpers:{
                FormIgualEstado: (nome, esperado)=>{
                    if(nome==esperado){
                        return "selected"
                    }
                },
                ComparacaoStatus: (nome, esperado)=>{
                    if(nome==esperado){
                        //return '<p><b>Status:</b> Perdido</p>'
                        return '<p><a href="#" data-tooltip="Im the tooltip text.">Im a link with a tooltip.</a></p>'
                    } else {
                        return '<p><b>Status:</b>Padrão</p>'
                    }
                },
                ComparacaoStatusBotao: (nome, esperado)=>{
                    if(nome==esperado){
                        return 'hidden'
                        
                    } else {
                        return 'visible'
                    }
                }
            }
        }));
        app.set('view engine', 'handlebars');
        app.set("views", "./views");
    //express
        const port = 8001;
    //BodyParser
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(bodyParser.json())

        //MIDDLEWARE
    //SESSION
        /*app.use((req, res, next)=>{
            res.locals.success_msg = req.flash('sucess_msg')
            res.locals.error_msg = req.flash("error_msg")
            next();
        })*/
    //VALIDACAO DE FORMULARIO
        
    //AUTENTIFICACAO

    //

//ROTAS PUBLICAS
app.get("/", function(req, res){
    try{
        BDAnimalPerdido.findAll({limit: 9}).then((ResultadoConsulta)=>{
            let Animal = []
            for(let i=0;i < ResultadoConsulta.length;i++){
                BDAnimal.findOne({where:{IdAnimal:ResultadoConsulta[i].dataValues.IdAnimal}}).then((ResultadoAnimal)=>{
                    Animal.push({IdAnimal:ResultadoConsulta[i].dataValues.IdAnimal, Nome:ResultadoAnimal.dataValues.Nome})
                }).catch((e)=>{
                    res.send(e)
                })
            }
            let Resultado = {}
            Resultado.Animal = Animal
            console.log(Resultado)
            if(req.user){
                Resultado.logado=true
                res.render('Home', Resultado)
            } else
                res.render('Home', Resultado)
        }).catch((e)=>{
            res.send(e)
        })
        
    }catch(e){
        res.render('NotFound', {layout: false});
    }
});

//PESQUISAR
app.get('/Pesquisar',(req,res)=>{
    res.render('Pesquisar')
})

app.post('/PesquisarRed',(req,res)=>{
    res.redirect('/Cliente/'+req.body.ID)
})

/* -Continua no Projetointegrador 3-
app.post('/Denunciar', ()=>{
    try{
        const Denuncia = require("../models/Denuncia");
        Denuncia.create({
            IdAnimal:req.body.IdAnimal,
            IdLoja:req.body.IdLoja,
            IdCliente:req.body.IdCliente,
            Descricao:req.body.Descricao,
        })
    }catch(e){

    }
})*/

//DECLARACAO DAS ROTAS:
    //CLIENTE e login
    app.use('/Cliente', Cliente);
    
    //ANIMAL
    app.use('/Animal', Animal);
    
    //Loja -Continua no Projetointegrador 3-
    //app.use('/Loja', Loja);
    
    //RECURSOS NECESSARIOS
    app.use('/Resources', Resources);

    //FORMULARIOS
    app.use('/Formulario', authenticationMiddleware, Formulario);

app.listen(port, ()=>{
});
