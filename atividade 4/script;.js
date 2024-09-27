const express = require('express');
const app = express();
const port = 3000;


let estoque = {};


app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;

    if (estoque[id]) {
        return res.status(400).send(`produto com id ${id} já existe. use a rota '/editar' para alterar a quantidade.`);
    }

    estoque[id] = { nome, qtd: parseInt(qtd) };
    res.send(`produto ${nome} (id: ${id}) adicionado ao estoque com sucesso!`);
});


app.get('/listar', (req, res) => {
    if (Object.keys(estoque).length === 0) {
        return res.status(200).send('estoque vazio.');
    }
    res.json(estoque);
});


app.get('/remover/:id', (req, res) => {
    const { id } = req.params;

    if (!estoque[id]) {
        return res.status(404).send(`produto com id ${id} não encontrado no estoque.`);
    }

    delete estoque[id];
    res.send(`produto com id ${id} removido do estoque.`);
});


app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;

    if (!estoque[id]) {
        return res.status(404).send(`produto com id ${id} não encontrado no estoque.`);
    }

    estoque[id].qtd = parseInt(qtd);
    res.send(`quantidade do produto ${estoque[id].nome} (id: ${id}) alterada para ${qtd}.`);
});


app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`);
});
