const express = require('express');
const calculadoraController = require('./controllers/calculadoraController');
const app = express();


app.get('/somar/:a/:b', calculadoraController.somar);


app.get('/subtrair/:a/:b', calculadoraController.subtrair);


app.get('/multiplicar/:a/:b', calculadoraController.multiplicar);


app.get('/dividir/:a/:b', calculadoraController.dividir);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});