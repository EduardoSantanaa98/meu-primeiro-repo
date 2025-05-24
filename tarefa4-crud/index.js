const express = require('express');
const app = express();
app.use(express.json());

const port = 3000;

let tasks = [];
let idCounter = 1;

app.post('/task', (req, res) => {
  const { title } = req.body;
  const newTask = { id: idCounter++, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/task/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.put('/task/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.title = req.body.title;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.delete('/task/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.json({ message: 'Tarefa apagada com sucesso' });
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
