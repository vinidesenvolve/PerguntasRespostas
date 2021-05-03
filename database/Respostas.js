const sequelize = require("sequelize");
const conexao = require("./database");

const Resposta = conexao.define(
    'respostas', {
        corpo:{
            type: sequelize.TEXT,
            allownull: false
        },
        perguntaID:{
            type: sequelize.INTEGER,
            allowNull: false
        }
    }
);

Resposta.sync({force: false});

module.exports = Resposta;