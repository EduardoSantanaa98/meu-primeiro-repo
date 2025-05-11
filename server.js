ECHO est� ativado.
const express = require('express');
const app = express();

app.use(express.json());
app.get('/autor', (req, res) => {
    if (req.get('Accept') ==='application/json') {
        res.json({autor:"Nome do autor"});
    } else {
        res.send('<h1>Nome do autor</h1>');
    }
});

app.listen(3000, () =>{
    console.log('Servidor rodando na porta 3000');
});


app.get('/tema', (req, res) => {
    res.json([{ id: 1, nome: 'tema 1'}]);
});

app.post('/tema', (req, res) =>{
    const novoTema = req.body;
    res.status(201).json({ nome: novoTema.nome});
});

app.put('/tema/:id', (req, res) => {
    const id = req.params.id;
    const temaAtualizado = req.body;
    res.json({id, nome: temaAtualizado.nome });
});
app.delete('/tema/:id', (req, res) => {
    const id = req.params.id;
    res.json({ message: `Tema com ID ${id} excluido`});
});


app.get('/tema/:id/categorias', (req, res) => {
    res.json([{ id: 1, nome: 'Categoria 1'}]);
});

app.post('/tema/:id/categorias', (req, res) => {
    const novaCategoria = req.body;
    res.status(201).json({nome: novaCategoria.nome});
});

app.put('/tema/:id/categorias/:categoriaId', (req, res) => {
    const categoriaId = req.params.categoriaId;
    const categoriaAtualizada = req.body;
    res.json({ categoriaId, nome: categoriaAtualizada.nome });
});

app.delete('/tema/:id/categorias/:categoriaId', (req, res) => {
    const categoriaId = req.params.categoriaId;
    res.json({ message:`Categoria com ID ${categoriaId} excluida` });
});

