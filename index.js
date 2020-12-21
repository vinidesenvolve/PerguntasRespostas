//importando modulo express
const express = require("express");
const app = express();

//definindo ejs como view engine
app.set('view engine', 'ejs'); 

//definindo rota
app.get("/", (req, res) => {
    let nome = "Mano Brown";
    let estado = "Vida loka";
    let erroMsg = false;
    let musicas = [
        {faixa: "Jesus chorou"},
        {faixa: "Vida loka II"},
        {faixa: "Diário de um detento"},
        {faixa: "Fim de semana no parque"}
    ];

    res.render("home",
        {
            nome,
            estado,
            associação: "Racionais Mc's",
            tretas: 1000,
            msg: erroMsg,
            musicas
        });
});

//carregamento do servidor com arrow function () =>
app.listen(8181, () => console.log("Server ON"));   