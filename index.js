//importando modulo express
const express = require("express");
const app = express();

//definindo ejs como view engine
app.set('view engine', 'ejs'); 

//definindo o local dos arquivos estáticos na pasta public
app.use(express.static('public'));

//definindo rota
app.get("/primeira", (req, res) => {
    //rederizando a pagina home.ejs e passando objetos 
    res.render("home");
});

//carregamento do servidor com arrow function () =>
app.listen(8181, () => console.log("Server ON"));   