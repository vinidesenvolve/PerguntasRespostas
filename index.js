//importando modulo express
const express = require("express");
const app = express();
//importando lib body-parser que traduz dados do html para js
const bodyParser = require("body-parser");
//importando conexão 
const conectarDB = require("./database/database");
//importando modulo perguntas
const pergunta = require("./database/Perguntas");
const Pergunta = require("./database/Perguntas");

//definindo ejs como view engine
app.set('view engine', 'ejs'); 
//conifgurando BP no express
app.use(bodyParser.urlencoded({extended: false}));

//definindo o local dos arquivos estáticos na pasta public
app.use(express.static('public'));

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({raw: true, order: [['id','DESC']]}).//SELECT * FROM perguntas ORDER BY id DESC
    then(perguntasDB => {
        res.render("home", { //rederizando a pagina home.ejs e passando objetos 
            perguntas: perguntasDB,
            titulo: perguntasDB.titulo   
        }); 
    });
});

//Rota para fazer pergunta
app.get("/perguntar", (req, res) => {
    res.render("pergunta");
});

//Rota para receber info do formulário
app.post("/receberpergunta", (req, res) => {
    
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao})
        .then(() => {res.redirect("/")});   
});

//Rota para responder a pergunta
app.get("/resposta/:id", (req, res) => {
    let id = req.params.id;

    Pergunta.findOne({
        where:{id}
    }).then(pergunta => {
        if(pergunta != undefined)
            return res.render("resposta", {
                pergunta: pergunta
            });
        res.redirect("/");
        });
});

//carregamento do servidor com arrow function () =>
app.listen(8181, () => console.log("Server no ar fdp pa pa pa"));

//Estabelecendo conexão com o banco
conectarDB.authenticate()
    .then(() => {
        console.log("Banco de dados conectado");    
    })
    .catch((erro) => {
        console.log("Banco de dados NÃO conectado!");
    });
