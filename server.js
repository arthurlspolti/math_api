const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/calcularJuros", function (req, res) {
  let valorPrincipal = parseFloat(req.body.valorPrincipal);
  let taxaDeJuros = parseFloat(req.body.taxaDeJuros);
  let tempo = parseFloat(req.body.tempo);
  // Calcula os juros simples
  let juros = (valorPrincipal * taxaDeJuros * tempo) / 100;
  // Calcula o montante
  let montante = valorPrincipal + juros;
  // Retorna o resultado na resposta
  res.json({ juros: juros, montante: montante });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
