const localStrategy = require('passport-local').Strategy
const crypto = require('crypto');

//MODELS
const Cliente = require('../models/Cliente');


module.exports = function(passport){

    passport.use(new localStrategy({
        usernameField:'Email',
        passwordField:'Senha',
    }, (Email, Senha, done) =>{
        Cliente.findOne({where:{Email:Email}}).then((cliente)=>{
            if(!cliente){
                return done(null, false, {massage: 'Conta nao existe'})
            } else {
                const TruncSenha = Email+Senha;
                const senhaHash = crypto.createHash('sha256').update(TruncSenha).digest('hex');
                console.log(senhaHash)
                if(senhaHash==cliente.Senha){
                    return done(null, cliente)
                } else {
                    return done(null, false, {massage: 'Senha incorreta'})
                }
            }
        }).catch((err)=>{
            console.log(err)
            done(err,false)
        })
    }))
    passport.serializeUser((cliente, done)=>{
        done(null, cliente.IdCliente)
    })

    passport.deserializeUser((id, done)=>{
        try{
            Cliente.findByPk(id).then((user)=>{
                done(null, user)
            })
        }catch(err){
            console.log(err)
            return done(err, null)
        }
    })
}