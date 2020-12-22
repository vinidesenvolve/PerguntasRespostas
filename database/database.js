//Importando modulo Sequelize
const Sequelize = require("sequelize");

//Criando a conexão com o BD
const conexao = new Sequelize('PerguntasRespostasDB','root','qwer', {
    host: 'localhost',
    dialect: 'mysql'
});

//Exportando conexão
module.exports = conexao;