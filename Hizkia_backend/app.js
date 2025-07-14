const express = require('express');
const app = express();
const data = require('./example-data.json');

app.use(express.json());

app.get('/users', (req, res) => {
  res.json(data);
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = data.find((u) => u.id == id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.post('/users', (req, res) => {
  const user = req.body;
  data.push(user);
  res.status(201).send({ message: 'User created' });
});

app.patch('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = data.find((u) => u.id == id);
  if (user) {
    Object.assign(user, req.body);
    res.send({ message: 'User updated' });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((u) => u.id == id);
  if (index !== -1) {
    data.splice(index, 1);
    res.send({ message: 'User deleted' });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.listen(3000, () => console.log('Listening on port 3000'));