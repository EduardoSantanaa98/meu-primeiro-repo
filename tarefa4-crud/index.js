const express = require('express');
const { sequelize, Task } = require('./models/Task');
const app = express();

app.use(express.json());

const port = 3000;

sequelize.sync().then(() => {
  console.log('Banco sincronizado');
});

app.post('/task', async (req, res) => {
  try {
    const task = await Task.create({ title: req.body.title });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

app.get('/task/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) res.json(task);
  else res.status(404).json({ message: 'Tarefa não encontrada' });
});

app.put('/task/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    task.title = req.body.title;
    await task.save();
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.delete('/task/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    await task.destroy();
    res.json({ message: 'Tarefa apagada com sucesso' });
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});