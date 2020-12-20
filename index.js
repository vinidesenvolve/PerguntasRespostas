//importando modulo express
const express = require("express");
const app = express();

//definindo ejs como view engine
app.set('view engine', 'ejs'); 

//definindo rota
app.get("/", (req, res) => res.render("home"));

//carregamento do servidor com arrow function () =>
app.listen(8181, () => console.log("Server ON"));   