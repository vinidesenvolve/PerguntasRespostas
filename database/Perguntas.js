//Model de perguntas

const sequelize = require("sequelize");
const conexao = require("./database");

//Modelando tabela pergunta
const Pergunta = conexao.define(
    'perguntas',{
        titulo: {
            type: sequelize.STRING,
            allowNull: false
        },
        descricao: {
            type: sequelize.TEXT,
            allowNull: false
        }
    }
);

//Criando no Banco
Pergunta.sync({force: false}).then(() => {});

//Exportando Model Pergunta
module.exports = Pergunta;