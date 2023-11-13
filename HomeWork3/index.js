const express = require('express');

const app = express();
const fs = require('fs');

let counter = {};
const data = fs.readFileSync('counter.json');
counter = JSON.parse(data);

app.get('/', (req, res) => {
    counter['/'] = (counter['/'] || 0) + 1;
    saveCounter();
    res.send(`
        <h1>Добро пожаловать на мой сайт!</h1>
        <p>Количество просмотров страницы:${counter['/']}</p>
        <a href='/about'>На страницу /about</a>
    `);
});

app.get('/about', (req, res) => {
    counter['/about'] = (counter['/about'] || 0) + 1;
    saveCounter();
    res.send(`
        <h1>Страница обо мне!</h1>
        <p>Количество просмотров страницы:${counter['/about']}</p>
        <a href='/'>На страницу /</a>
    `);
});

function saveCounter() {
    fs.writeFile('counter.json', JSON.stringify(counter), () => {
        console.log('Файл записан');
    });
  }

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
  });


