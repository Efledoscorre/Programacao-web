const calculadora = require('../util/calculadora');


const somar = (req, res) => {
    const { a, b } = req.params;
    const resultado = calculadora.somar(Number(a), Number(b));
    res.send(`resultado da soma: ${resultado}`);
};


const subtrair = (req, res) => {
    const { a, b } = req.params;
    const resultado = calculadora.subtrair(Number(a), Number(b));
    res.send(`resultado da subtraçao: ${resultado}`);
};


const multiplicar = (req, res) => {
    const { a, b } = req.params;
    const resultado = calculadora.multiplicar(Number(a), Number(b));
    res.send(`resultado da multiplicaçao: ${resultado}`);
};


const dividir = (req, res) => {
    const { a, b } = req.params;
    const resultado = calculadora.dividir(Number(a), Number(b));
    res.send(`resultado da divisao: ${resultado}`);
};

module.exports = { somar, subtrair, multiplicar, dividir };