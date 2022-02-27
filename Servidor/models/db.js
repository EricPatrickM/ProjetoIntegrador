const Sequelize = require('sequelize')
const sequelize = new Sequelize('projetointegrador', 'root', 'Monsuno@veigar',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}