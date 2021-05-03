//importando modulo express
const express = require("express");
const app = express();
//importando lib body-parser que traduz dados do html para js
const bodyParser = require("body-parser");
//importando conexão 
const conectarDB = require("./database/database");
//importando modulo Pergunta
const Pergunta = require("./database/Perguntas");
//impotando modulo Resposta
const Resposta = require("./database/Respostas");

//definindo ejs como view engine
app.set('view engine', 'ejs'); 

//conifgurando BP no express
app.use(bodyParser.urlencoded({extended: false}));

//definindo o local dos arquivos estáticos na pasta public
app.use(express.static('public'));

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({ //SELECT * FROM perguntas ORDER BY id DESC
        raw: true, 
        order: [['id','DESC']]
    }).
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

//Rota para receber pergunta
app.post("/receberPergunta", (req, res) => {
    
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
    })
    .then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({ 
                where:{perguntaID : pergunta.id},
                order: [['id','DESC']]
            })
            .then(respostas => {
                    res.render("resposta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }
        else res.redirect("/");
    });        
});

//Rota para receber resposta
app.post("/receberResposta", (req, res) => {

    let resposta = req.body.corpo;
    let id = req.body.perguntaID;

    Resposta.create({
        corpo: resposta,
        perguntaID: id})
        .then(() => {res.redirect("/resposta/"+id)});
});

//carregamento do servidor com arrow function () =>
const server = app.listen(8080, () => {
    const host = "localhost"
    const port = server.address().port
    console.log(`No ar em ${host}:${port}`)
});

//Estabelecendo conexão com o banco
conectarDB.authenticate()
    .then(() => {
        console.log("Banco de dados conectado");    
    })
    .catch((erro) => {
        console.log("Banco de dados NÃO conectado!");
    });
