const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const TOKEN_SIMPLES = "seu-token-simples";
let tarefas = [];

app.post('/task', (req, res) => {
  const { descricao } = req.body;
  if (!descricao) {
    return res.status(400).json({ erro: 'Descrição é obrigatória' });
  }
  tarefas.push({ id: tarefas.length + 1, descricao });
  res.status(201).json({ mensagem: 'Tarefa adicionada com sucesso' });
});

app.post('/login', (req, res) => {
  const { user, pass } = req.body;

  if (user === 'admin' && pass === 'senha123') {
    res.json({ token: TOKEN_SIMPLES });
  } else {
    res.status(401).json({ erro: 'Usuário ou senha incorretos' });
  }
});

app.get('/tasks', (req, res) => {
  const token = req.headers['authorization'];

  if (token === TOKEN_SIMPLES) {
    return res.json(tarefas);
  } else {
    return res.status(403).json({ message: 'Acesso proibido. Token inválido.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
