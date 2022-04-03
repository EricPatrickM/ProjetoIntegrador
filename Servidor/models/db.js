const Sequelize = require('sequelize')
const sequelize = new Sequelize('projetointegrador', 'root', 'Taprootsql1!',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}