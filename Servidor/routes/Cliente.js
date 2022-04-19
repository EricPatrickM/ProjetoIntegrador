const express = require("express");
const router = express.Router();
const Cliente = require('../models/Cliente');
const Animal = require('../models/Animal');
const TelefoneCliente = require('../models/TelefoneCliente') 
const crypto = require('crypto');
const passport = require('passport')

router.get('/teste', (req,res)=>{
    console.log(req._parsedOriginalUrl.pathname)
});


router.get('/:IdCliente',(req, res)=>{
    const IdCliente = parseInt(req.params.IdCliente);
    Cliente.findByPk(IdCliente).then((ResultadoConsulta)=>{
        if(!ResultadoConsulta || ResultadoConsulta.dataValues.Disponivel==0){
            res.render('NotFound', {layout: false});
        } else {
            ResultadoConsulta = ResultadoConsulta.dataValues
            TelefoneCliente.findAll({where:{IdCliente:IdCliente}}).then((ResultadoConsultaTelefone)=>{
                for(let i=0;i < ResultadoConsultaTelefone.length;i++){
                    if(ResultadoConsultaTelefone[i].dataValues.NumeroOrdem==1)
                        ResultadoConsulta.NumeroCelular1=ResultadoConsultaTelefone[i].dataValues.Numero
                    if(ResultadoConsultaTelefone[i].dataValues.NumeroOrdem==2)
                        ResultadoConsulta.NumeroCelular2=ResultadoConsultaTelefone[i].dataValues.Numero
                }
                //ResultadoConsulta.TelaDaConta = true;
                ResultadoConsulta=FiltrandoTabelaCliente(ResultadoConsulta, req.query.CodigoAcesso);
                console.log(ResultadoConsulta)
                /*if(!req.query.NumeroPagina || parseInt(req.query.NumeroPagina,10) < 0 || req.query.NumeroPagina===parseInt(req.query.NumeroPagina) 
                || !(!isNaN(req.query.NumeroPagina) && parseInt(Number(req.query.NumeroPagina)) == req.query.NumeroPagina && !isNaN(parseInt(req.query.NumeroPagina, 10)))){
                    console.log('\n\nERRO')
                    var NumeroPagina=1
                } else {
                    var NumeroPagina=parseInt(req.query.NumeroPagina)
                }*/
            }).catch((e)=>{
                console.log(e)
                res.send(e)
                //res.render('NotFound', {layout: false});
            })
            Animal.findAll({where:{IdCliente:IdCliente}/*,limit: 8, offset: 8*(NumeroPagina-1*/}).then((ResultadoConsultaAnimal)=>{
                if(ResultadoConsultaAnimal){
                    var AnimalObtidos=[];
                    for(var i=0;i < ResultadoConsultaAnimal.length;i++){
                        if(ResultadoConsultaAnimal[i].dataValues.Disponivel)
                            AnimalObtidos.push(ResultadoConsultaAnimal[i].dataValues)
                    }
                    ResultadoConsulta.AnimalCadastrados = AnimalObtidos;
                    console.log(ResultadoConsulta)
                    if (req.user)
                        ResultadoConsulta.logado=true;

                    res.render("Cliente", ResultadoConsulta);

                    /*Animal.findAndCountAll({where:{IdCliente:IdCliente},limit: 8, offset: 8*(NumeroPagina-1)}). then((QuantidadeAnimais)=>{ 
                        ResultadoConsulta.QuantidadeAnimais = QuantidadeAnimais.count;
                        if(req.query.device=="Mobile"){
                            res.json(ResultadoConsulta);
                        } else{
                            res.render("Cliente", ResultadoConsulta);
                        }
                    }).catch(()=>{

                    });*/
                } //else {
                    //ResultadoConsulta.QuantidadeAnimais = 0
                //}
            }).catch((e)=>{
                res.render('NotFound', {layout: false});
            })
        }
    }).catch((e)=>{
        res.render('NotFound', {layout: false});
    });
});

router.post('/LoginEnviar', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
}));

router.post('/RegistrarEnviar', (req, res)=>{
    //revisar entrada XSS
    //Verificar se usuario ja nao existe
    const SenhaCriptografada = req.body.Email + req.body.Senha;
    const DataAtual = new Date();
    const CodigoAcessoCriptografado = req.body.Email+DataAtual.getTime();
    try{
        if(!Date.parse(req.body.DataNascimento))
            req.body.DataNascimento=null
        if(req.body.Estado=='NULL')
            req.body.Estado=null
    }catch(e){
        req.body.DataNascimento=null
        req.body.Estado=null
    }
    Cliente.create({
        Nome:req.body.Nome,
        Senha:crypto.createHash('sha256').update(SenhaCriptografada).digest('hex'),
        Email:req.body.Email,
        DataNascimento: req.body.DataNascimento,
        CodigoAcesso:crypto.createHash('sha256').update(CodigoAcessoCriptografado).digest('hex'),
        Estado:req.body.Estado,
        Cidade: req.body.Cidade,
        Bairro: req.body.Bairro,
        Rua: req.body.Rua,
        Numero: req.body.Numero,
        Complemento: req.body.Complemento,
        VisibilidadeNome: req.body.VisibilidadeNome,
        VisibilidadeEmail: req.body.VisibilidadeEmail,
        VisibilidadeNumeroCelular1:req.body.VisibilidadeNumeroCelular1,
        VisibilidadeNumeroCelular2:req.body.VisibilidadeNumeroCelular2,
        VisibilidadeDataNascimento: req.body.VisibilidadeDataNascimento,
        VisibilidadeEstado: req.body.VisibilidadeEstado,
        VisibilidadeCidade: req.body.VisibilidadeCidade,
        VisibilidadeBairro: req.body.VisibilidadeBairro,
        VisibilidadeRua: req.body.VisibilidadeRua,
        VisibilidadeNumero: req.body.VisibilidadeNumero,
        VisibilidadeComplemento: req.body.VisibilidadeComplemento,
        Disponivel: true,
    }).then(()=> {
            Cliente.findAll({
                where:{Email:req.body.Email}, raw: true
            }).then((Consulta)=>{
                let UsuarioId=Consulta[0].IdCliente;
                TelefoneCliente.create({
                    IdCliente:UsuarioId,
                    Numero:req.body.Celular1,
                    NumeroOrdem: '1',
                }).then(()=>
                TelefoneCliente.create({
                    IdCliente:UsuarioId,
                    Numero:req.body.Celular2,
                    NumeroOrdem: '2',
                }).then().catch(()=>{
                    res.send('Erro');
                })
                ).catch((e)=>{
                    res.send(e);
                })
            }).catch((e)=>{
                res.send(e)
            }) 
        }).catch((e)=>{
            res.send(e);
        }
        );
});

//visibilidade 0=publica, 1=somente com codigo de acesso e 2= privado
function FiltrandoTabelaCliente(ResultadoConsulta, CodigoAcesso){
    ResultadoConsulta=FiltrandoCampoVazio(ResultadoConsulta)
    if(ResultadoConsulta.VisibilidadeNome==2){
        ResultadoConsulta.Nome = "PRIVADO";
    } else {
        if(ResultadoConsulta.VisibilidadeNome==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.Nome = "APENAS COM CÓDIGO";
        }
    }
    
    if(ResultadoConsulta.VisibilidadeEmail==2){
        ResultadoConsulta.Email = "PRIVADO";
    }else {
        if(ResultadoConsulta.VisibilidadeEmail==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.Email = "APENAS COM CÓDIGO";
        }
    }
    
    if(ResultadoConsulta.VisibilidadeEstado==2){
        ResultadoConsulta.Estado = "PRIVADO";
    } else {
        if(ResultadoConsulta.VisibilidadeEstado==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.Estado = "APENAS COM CÓDIGO";
        }
    }
    
    if(ResultadoConsulta.VisibilidadeCidade==2){
        ResultadoConsulta.Cidade = "PRIVADO";
    } else {
        if(ResultadoConsulta.VisibilidadeCidade==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.Cidade = "APENAS COM CÓDIGO";
        }
    }
    
    if(ResultadoConsulta.VisibilidadeBairro==2){
        ResultadoConsulta.Bairro = "PRIVADO";
    } else {
        if(ResultadoConsulta.VisibilidadeBairro==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.Bairro = "APENAS COM CÓDIGO";
        }
    }
    
    if(ResultadoConsulta.VisibilidadeRua==2){
        ResultadoConsulta.Rua = "PRIVADO";
    } else {
        if(ResultadoConsulta.VisibilidadeRua==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.Rua = "APENAS COM CÓDIGO";
        }
    }
    
    if(ResultadoConsulta.VisibilidadeNumero==2){
        ResultadoConsulta.Numero = "PRIVADO";
    } else {
        if(ResultadoConsulta.VisibilidadeNumero==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.Numero = "APENAS COM CÓDIGO";
        }
    }
    
    if(ResultadoConsulta.VisibilidadeComplemento==2){
        ResultadoConsulta.Complemento = "PRIVADO";
    } else {
        if(ResultadoConsulta.VisibilidadeComplemento==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.Complemento = "APENAS COM CÓDIGO";
        }
    }
    
    if(ResultadoConsulta.VisibilidadeNumeroCelular1==2){
        ResultadoConsulta.NumeroCelular1 = "PRIVADO";
    } else {
        if(ResultadoConsulta.VisibilidadeNumeroCelular1==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.NumeroCelular1 = "APENAS COM CÓDIGO";
        }
    }

    if(ResultadoConsulta.VisibilidadeNumeroCelular2==2){
        ResultadoConsulta.NumeroCelular2 = "PRIVADO";
    } else {
        if(ResultadoConsulta.VisibilidadeNumeroCelular2==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso){
            ResultadoConsulta.NumeroCelular2 = "APENAS COM CÓDIGO";
        }
    }

    //ResultadoConsulta=FiltrandoCampoVazio(ResultadoConsulta);
    return ResultadoConsulta;
};
    
function FiltrandoCampoVazio(ResultadoConsulta){
    if(ResultadoConsulta.Nome == null){
        ResultadoConsulta.Nome = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.Email == null){
        ResultadoConsulta.Email = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.Estado == null){
        ResultadoConsulta.Estado = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.Cidade == null){
        ResultadoConsulta.Cidade = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.Bairro == null){
        ResultadoConsulta.Bairro = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.Rua == null){
        ResultadoConsulta.Rua = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.Numero == null){
        ResultadoConsulta.Numero = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.Complemento == null){
        ResultadoConsulta.Complemento = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.DataNascimento == null){
        ResultadoConsulta.DataNascimento = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.NumeroCelular1 == null){
        ResultadoConsulta.NumeroCelular1 = "NÃO INFORMADO";
    }
    if(ResultadoConsulta.NumeroCelular2 == null){
        ResultadoConsulta.NumeroCelular2 = "NÃO INFORMADO";
    }
    return ResultadoConsulta
};
    
function FiltrandoEntrada(req){
    var error = []
    if (req.body.Nome.trim().length() < 8) {
        error.push({ field: 'Nome', erro: 'Nome muito curto' })
    } else {
        if (req.body.Nome.trim() == 'NULL' || req.body.Nome.trim() == 'undefined') {
            error.push({ field: 'Nome', erro: 'Campo Vazio' })
        } else {
            if (req.body.Nome.trim().length() > 50) {
                error.push({ field: 'Nome', erro: 'Nome muito longo' })
            }
        }
    }

    if (req.body.Senha.trim().length() < 7) {
        error.push({ field: 'Senha', erro: 'Senha muito curto' })
    } else {
        if (req.body.Senha.trim() == 'NULL' || req.body.Senha.trim() == 'undefined') {
            error.push({ field: 'Senha', erro: 'Campo Vazio' })
        }
    }

if(req.body.Email.trim().length() < 8){
    error.push({field:'Email', erro:'Email muito curto'})
} else {
    if(req.body.Email.trim()=='NULL' || req.body.Email.trim()=='undefined'){
        error.push({field:'Email', erro:'Campo Vazio'})
    } else {
        if(req.body.Email.trim().length() > 50){
            error.push({field:'Email', erro:'Email muito longo'})
        }
    }
}

//DATA
/*if(req.body.DataNascimento.trim().length() != 10){
    error.push({field:'DataNascimento', erro:'DataNascimento invalida'})
} else {
    var DataAtual = new Date()-req.body.DataNascimento
    if(DataAtual.year < 10){
        error.push({field:'DataNascimento', erro:'DataNascimento muito recente'})
    }
}*/

if(req.body.Estado.trim().length() > 2 || req.body.Estado.trim()=='NULL' || req.body.Estado.trim()=='undefined'){
    error.push({field:'Estado', erro:'Estado nao existe'})
} else {
    var teste = false;
    var estados = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT',
    'PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];
    estados.forEach((item)=>{if(item==req.body.Estado.trim().length()){teste=true;}})
    if(teste==false){
        error.push({field:'Estado', erro:'Estado nao existe'})
    }
}

if(req.body.Cidade.trim().length() < 4){
    error.push({field:'Cidade', erro:'Cidade muito curto'})
} else {
    if(req.body.Cidade.trim()=='NULL' || req.body.Cidade.trim()=='undefined'){
        error.push({field:'Cidade', erro:'Campo Vazio'})
    } else {
        if(req.body.Cidade.trim().length() > 40){
            error.push({field:'Cidade', erro:'Cidade muito longo'})
        }
    }
}

if(req.body.Bairro.trim().length() < 4){
    error.push({field:'Bairro', erro:'Bairro muito curto'})
} else {
    if(req.body.Bairro.trim()=='NULL' || req.body.Bairro.trim()=='undefined'){
        error.push({field:'Bairro', erro:'Campo Vazio'})
    } else {
        if(req.body.Bairro.trim().length() > 40){
            error.push({field:'Bairro', erro:'Bairro muito longo'})
        }
    }
}

if(req.body.Rua.trim().length() < 4){
    error.push({field:'Rua', erro:'Rua muito curto'})
} else {
    if(req.body.Rua.trim()=='NULL' || req.body.Rua.trim()=='undefined'){
        error.push({field:'Rua', erro:'Campo Vazio'})
    } else {
        if(req.body.Rua.trim().length() > 50){
            error.push({field:'Rua', erro:'Rua muito longo'})
        }
    }
}

if(isInteger(req.body.Numero)){
    error.push({field:'Numero', erro:'Numero nao inteiro'})
} else {
    if(req.body.Numero.trim() < 0){
        error.push({field:'Numero', erro:'Numero negativo'})
    } else {
        if(req.body.Numero.trim().length > 32000){
            error.push({field:'Numero', erro:'Numero muito grande'})
        }
    }
}

if(req.body.Complemento.trim().length() > 200){
    error.push({field:'Complemento', erro:'Campo muito grande'})
}

if(req.body.VisibilidadeNome=='0' || req.body.VisibilidadeNome=='1' || req.body.VisibilidadeNome=='2'){
    error.push({field:'VisibilidadeNome', erro:'VisibilidadeNome invalido'})
}

if(req.body.VisibilidadeEmail=='0' || req.body.VisibilidadeEmail=='1' || req.body.VisibilidadeEmail=='2'){
    error.push({field:'VisibilidadeEmail', erro:'VisibilidadeEmail invalido'})
}

if(req.body.VisibilidadeDataNascimento=='0' || req.body.VisibilidadeDataNascimento=='1' || req.body.VisibilidadeDataNascimento=='2'){
    error.push({field:'VisibilidadeDataNascimento', erro:'VisibilidadeDataNascimento invalido'})
}

if(req.body.VisibilidadeEstado=='0' || req.body.VisibilidadeEstado=='1' || req.body.VisibilidadeEstado=='2'){
    error.push({field:'VisibilidadeEstado', erro:'VisibilidadeEstado invalido'})
}

if(req.body.VisibilidadeCidade=='0' || req.body.VisibilidadeCidade=='1' || req.body.VisibilidadeCidade=='2'){
    error.push({field:'VisibilidadeCidade', erro:'VisibilidadeCidade invalido'})
}

if(req.body.VisibilidadeBairro=='0' || req.body.VisibilidadeBairro=='1' || req.body.VisibilidadeBairro=='2'){
    error.push({field:'VisibilidadeBairro', erro:'VisibilidadeBairro invalido'})
}

if(req.body.VisibilidadeRua=='0' || req.body.VisibilidadeRua=='1' || req.body.VisibilidadeRua=='2'){
    error.push({field:'VisibilidadeRua', erro:'VisibilidadeRua invalido'})
}

if(req.body.VisibilidadeNumero=='0' || req.body.VisibilidadeNumero=='1' || req.body.VisibilidadeNumero=='2'){
    error.push({field:'VisibilidadeNumero', erro:'VisibilidadeNumero invalido'})
}

if(req.body.VisibilidadeComplemento=='0' || req.body.VisibilidadeComplemento=='1' || req.body.VisibilidadeComplemento=='2'){
    error.push({field:'VisibilidadeComplemento', erro:'VisibilidadeComplemento invalido'})
}

if(req.body.VisibilidadeNumeroCelular1=='0' || req.body.VisibilidadeNumeroCelular1=='1' || req.body.VisibilidadeNumeroCelular1=='2'){
    error.push({field:'VisibilidadeNumeroCelular1', erro:'VisibilidadeNumeroCelular1 invalido'})
}

if(req.body.VisibilidadeNumeroCelular2=='0' || req.body.VisibilidadeNumeroCelular2=='1' || req.body.VisibilidadeNumeroCelular2=='2'){
    error.push({field:'VisibilidadeNumeroCelular2', erro:'VisibilidadeNumeroCelular2 invalido'})
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}
return error
};

module.exports = router