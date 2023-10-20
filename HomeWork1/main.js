const http = require('http');
let pageCounter = 0;
const server = http.createServer((req, res) => {
    console.log('Запрос получен');


    if(req.url === '/') {
        res.writeHead(200, {
            'Content-Type': "text/html; charset=UTF-8"
        });
        pageCounter++;
        res.end(`<h1>Корневая страница</h1><br><p>Просмотров:${pageCounter}</p><br><a href="/about">Ссылка на страницу/about</a>`);
    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': "text/html; charset=UTF-8"
        });
        pageCounter++;
        res.end(`<h1>Страница about</h1><br><p>Просмотров:${pageCounter}</p><br><a href="/">Ссылка на страницу/</a>`);
    } else {
        res.writeHead(200, {
            'Content-Type': "text/html; charset=UTF-8"
        });
        res.end('<h1>Страница не найдена!</h1>');
    }

});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на ${port} порту!`);
});