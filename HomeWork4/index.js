const express = require('express');

const app = express();
const fs = require('fs');
const usersFilePath = 'users.json';


app.get('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Файл не прочитан' });
    }

    const users = JSON.parse(data);
    res.json(users);
  });
});

app.post('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Файл не прочитан' });
    }

    const users = JSON.parse(data);
    const newUser = req.body; 
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Файл не записан' });
      }
      res.json(newUser);
    });
  });
});

app.put('/users:id', (req,res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Файл не прочитан' });
    }

    const users = JSON.parse(data);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      res.status(404).send('Пользователь не найден');
      return;
    }
    users[userIndex] = { ...users[userIndex], ...updateUser };
    fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Ошибка при записи файла пользователей');
        return;
      }
      res.send('Данные пользователя обновлены');
    });
  });
});

app.delete('/users:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if(err) {
      console.error(err);
      return res.status(500).json({ error : 'Файл не прочитан' });
    }
    const users = JSON.parse(data);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      res.status(404).send('Пользователь не найден');
      return;
    }
    users.splice(userIndex, 1);
    fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Ошибка при записи файла пользователей');
        return;
      }
      res.send('Данные пользователя обновлены');
    });
  })
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});