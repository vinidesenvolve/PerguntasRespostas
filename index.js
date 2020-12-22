//importando modulo express
const express = require("express");
const app = express();
//importando lib body-parser que traduz dados do html para js
const bodyParser = require("body-parser");

//definindo ejs como view engine
app.set('view engine', 'ejs'); 
//conifgurando BP no express
app.use(bodyParser.urlencoded({extended: false}));

//definindo o local dos arquivos estáticos na pasta public
app.use(express.static('public'));

//Rotas
app.get("/", (req, res) => {
    //rederizando a pagina home.ejs e passando objetos 
    res.render("home");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntas");
});

//Rota para receber info do formulário
app.post("/receberpergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.send("Pergunta enviada!" + titulo + descricao);
});

//carregamento do servidor com arrow function () =>
app.listen(8181, () => console.log("Server no ar fdp pa pa pa"));